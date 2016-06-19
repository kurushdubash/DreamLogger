from firebase import firebase
import uuid, datetime
import server

fireb = firebase.FirebaseApplication('https://dream-logger-6b7c0.firebaseio.com/', None)
firebase_token = firebase.FirebaseApplication('https://dreamleaffacebookapis.firebaseio.com/', None)

# @username: username of the user you'd like to add
# @password_hash: the hash of the password to the corresponding @username (Passwords should never be
# stored in clear text)
# @name: the name of the user corresponding to @username
# @email: the email of the corresponding @username
# returns: a dictionary of the user or dictionary of {error:errormessage}
def add_user_to_DB(username, password_hash, name, email, account_type='Standard', token=''):
	hash_id = hash_username(username)
	if(check_user_exists(username)): # User already exists!
		return None
	if account_type != 'Standard':
		firebase_token.put('/tokens', data=username, name=token)
	data = {'username':username, 'pass_hash': password_hash, 'name':name, 'email':email, 'account': {'account_type':account_type, 'token': token}, 'dreams':[]}
	return fireb.put('/users/', data=data, name=hash_id)

# @username: the username of the user you would like to remove from the database
def remove_user_from_DB(username):
	hash_id = hash_username(username)
	fireb.delete('/users/', name=hash_id);

# @username: is the username of which you want to retrieve all the dreams from 
# returns: a dictionary of all the dreams for @username from dream_id: {time, dream_content}
# if no dreams are found, returns None
def get_dreams_from_user(username):
	hash_id = hash_username(username)
	return fireb.get('/users/' + hash_id, name='dreams')

# @username: the username to add the entry to
# @dream_content: the text of the dream to add
# returns: dictionary of the dream added in form of dream_id: {time, dream_content}}
def add_dream_entry(username, dream_content):
	current_time = str(datetime.datetime.now().strftime("%I:%M:%S%p on %B %d, %Y"))
	data = {'time': current_time, 'content': dream_content}
	hash_id = hash_username(username)
	return fireb.put('/users/' + hash_id + '/dreams', data=data, name=uuid.uuid1())

# @username: the username to check
# returns: True or False 
def check_user_exists(username):
	hash_id = hash_username(username)
	response = fireb.get("/users/", name=hash_id)
	if(response):
		return True
	return False

# @username: the username to check
# returns: User object 
def get_user(username):
	hash_id = hash_username(username)
	response = fireb.get("/users/", name=hash_id)
	if not response:
		return None
	if response['account']['account_type'] == 'Facebook':
		email = ''
		if 'email' in response:
			email = response['email']
		user = server.User(response['username'], response['pass_hash'], email, response['name'], 'Facebook')
		user.facebook_token = response['pass_hash']
	else:
		user = server.User(response['username'], response['pass_hash'], response['email'], response['name'])
	user.password_hash = response['pass_hash']
	if 'dreams' in response:
		user.dreams = response['dreams']
	return user
	
# @username: takes in username to hash
# returns a unique string mapping that username with a 1:1 mapping
def hash_username(username):
	return_string = ''
	for char in username:
		return_string += str(ord(char)) + '-'
	return return_string[:-1]

def check_if_FB_token(token):
	return firebase_token.get('/tokens', name=token)