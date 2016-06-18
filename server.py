from flask import Flask, request, render_template
from database import *
from flask import jsonify
from passlib.apps import custom_app_context as pwd_context

app = Flask(__name__)
SUCCESS_MSG = 'Success'
ERROR_MSG = "There was an error with your request"

def hash_password(password):
	return pwd_context.encrypt(password)

def verify_password(password):
	return pwd_context.verify(password, password_hash)


@app.route("/", methods=["GET"])
def hello():
	return render_template('index.html', success="")


@app.route("/api/login", methods=["POST"])
def login():
	username = request.form['username']
	password = request.form['psw']
	user_id = get_user_id_from_accountd_DB(username, password)
	print(user_id)
	name = get_name(user_id)
	if(user_id != 0):
		return render_template('dream_logger.html', user=name)
	else:
		fail_msg = "The username/password combination you entered was not found."
		return render_template('index.html', success=fail_msg)

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
	hashed_pass = hash_password(password)
	response = add_user_to_DB(username, hashed_pass, name, email)
	if(not response):
		response = {'result':ERROR_MSG + ": User already exists"}
	else:
		response = {'result': SUCCESS_MSG}
	return jsonify(response)


@app.route("/api/log_entry", methods=["POST"])
def log_entry():
	try:
		username = request.json.get('username')
		dream_content = request.json.get('dream_content')
	except:
		return jsonify({'result':ERROR_MSG + ": Failed to parse JSON request"}) 
	dream = add_dream_entry(username, dream_content)
	return jsonify({'result': SUCCESS_MSG, 'dream':dream})

@app.route("/api/get_entries", methods=["GET", "POST"])
def get_entries():
	try:
		username = request.json.get('username')
	except:
		return jsonify({'result':ERROR_MSG + ": Failed to parse JSON request"}) 
	dreams = get_dreams_from_user(username)
	response = {'result': SUCCESS_MSG}
	response['dreams'] = dreams
	return jsonify(response)


if __name__ == "__main__":
	app.run(debug=True)
