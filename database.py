from firebase import firebase
import uuid, datetime
from server import *

firebase = firebase.FirebaseApplication('https://dream-logger-6b7c0.firebaseio.com/', None)

# @username: username of the user you'd like to add
# @password_hash: the hash of the password to the corresponding @username (Passwords should never be
# stored in clear text)
# @name: the name of the user corresponding to @username
# @email: the email of the corresponding @username
# returns: a dictionary of the user or dictionary of {error:errormessage}
def add_user_to_DB(username, password_hash, name, email):
	if(check_user_exists(username)): # User already exists!
		return None
	data = {'username':username, 'pass_hash': password_hash, 'name':name, 'email':email, 'dreams':[]}
	return firebase.put('/users/', data=data, name=username)

# @username: the username of the user you would like to remove from the database
def remove_user_from_DB(username):
	firebase.delete('/users/', name=username);

# @username: is the username of which you want to retrieve all the dreams from 
# returns: a dictionary of all the dreams for @username from dream_id: {time, dream_content}
# if no dreams are found, returns None
def get_dreams_from_user(username):
	return firebase.get('/users/' + username, name='dreams')

# @username: the username to add the entry to
# @dream_content: the text of the dream to add
# returns: dictionary of the dream added in form of dream_id: {time, dream_content}}
def add_dream_entry(username, dream_content):
	current_time = str(datetime.datetime.now().strftime("%I:%M:%S%p on %B %d, %Y"))
	data = {'time': current_time, 'content': dream_content}
	return firebase.put('/users/' + username + '/dreams', data=data, name=uuid.uuid1())

# @username: the username to check
# returns: True or False 
def check_user_exists(username):
	response = firebase.get("/users/", name=username)
	if(response):
		return True
	return False

# @username: the username to check
# returns: User object 
def get_user(username):
	response = firebase.get("/users/", name=username)
	print (response)
	if not response:
		return None
	user = User(response['username'], response['pass_hash'], response['email'], response['name'])
	user.password_hash = response['pass_hash']
	if 'dreams' in response:
		user.dreams = response['dreams']
	return user
	