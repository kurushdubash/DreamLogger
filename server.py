from flask import Flask, request, jsonify, g #render_template
import database as db
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
						  as Serializer, BadSignature, SignatureExpired)
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
SUCCESS_MSG = 'Success'
ERROR_MSG = "There was an error with your request"


# extensions
auth = HTTPBasicAuth()

# initialization
app.config['SECRET_KEY'] = '3hX7LXop9kFoeVEF4BGi70XtGeG90trYj2ofzXuk' #firebase API Secret used

class User():

	dreams = {}

	def __init__(self, username, password, email, name):
		self.username = username
		self.password_hash = self.hash_password(password)
		self.email = email
		self.name = name

	def hash_password(self, password):
		return pwd_context.encrypt(password)

	def verify_password(self, password):
		return pwd_context.verify(password, self.password_hash)

	def generate_auth_token(self, expiration=6000):
		s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
		return s.dumps({'username': self.username})

	@staticmethod
	def verify_auth_token(token):
		s = Serializer(app.config['SECRET_KEY'])
		try:
			data = s.loads(token)
		except SignatureExpired:
			return None	# valid token, but expired
		except BadSignature:
			return None	# invalid token

		user = db.get_user(data['username'])
		return user


@auth.verify_password
def verify_password(username_or_token, password):
	# first try to authenticate by token
	user = User.verify_auth_token(username_or_token)
	if not user:
		# try to authenticate with username/password
		user = db.get_user(username_or_token)
		if not user or not user.verify_password(password):
			return False
	g.user = user
	return True

@app.route('/api/token')
@auth.login_required
def get_auth_token():
	token = g.user.generate_auth_token(600)
	return jsonify({'token': token.decode('ascii'), 'duration': 6000})



@app.route("/api/signup", methods=["POST"])
def signup():
	try:
		username = request.json.get('username')
		password = request.json.get('password')
		name = request.json.get('name')
		email = request.json.get('email')
	except:
		return jsonify({'result':ERROR_MSG + ": Failed to parse JSON request"}) 

	if username is None or password is None or email is None or name is None:
		return jsonify({'result':ERROR_MSG + ": Missing argument"}) # missing arguments
	hashed_pass = pwd_context.encrypt(password)
	response = db.add_user_to_DB(username, hashed_pass, name, email)
	if(not response):
		response = {'result':ERROR_MSG + ": User already exists"}
	else:
		response = {'result': SUCCESS_MSG}
	return jsonify(response)


@app.route("/api/log_entry", methods=["POST"])
@auth.login_required
def log_entry():
	username = g.user.username
	try:
		dream_content = request.json.get('dream_content')
	except:
		return jsonify({'result':ERROR_MSG + ": Failed to parse JSON request"}) 
	dream = db.add_dream_entry(username, dream_content)
	return jsonify({'result': SUCCESS_MSG, 'dream':dream})

@app.route("/api/get_entries", methods=["GET", "POST"])
@auth.login_required
def get_entries():
	try:
		username = g.user.username
	except:
		return jsonify({'result':ERROR_MSG + ": Failed to parse JSON request"}) 
	dreams = db.get_dreams_from_user(username)
	response = {'result': SUCCESS_MSG}
	response['dreams'] = dreams
	return jsonify(response)


if __name__ == "__main__":
	app.run(debug=True)

