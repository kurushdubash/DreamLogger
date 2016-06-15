from flask import Flask, request, render_template
from database import *
import init_db

app = Flask(__name__)


answer_output = ''

@app.route("/", methods=["GET"])
def hello():
	return render_template('index.html', success="")


@app.route("/api/login", methods=["POST"])
def login():
	username = request.form['username']
	password = request.form['psw']
	user_id = get_user_id_from_accountd_DB(username, password)
	print(user_id)
	name = get_username(user_id)
	if(user_id != 0):
		return render_template('dream_logger.html', user=name)
	else:
		fail_msg = "The username/password combinations you entered were not found."
		return render_template('index.html', success=fail_msg)

@app.route("/api/signup", methods=["POST"])
def signup():
	request.form['username']
	request.form['username']
	request.form['username']
	# = request.POST['data'].json()

@app.route("/api/log_entry", methods=["POST"])
def log_entry():

	dream_entry = request.form['dream_content']
	add_entry(dream_entry)
	print("Succesfull logged entry: ")
	print(dream_entry)
	return app.send_static_file('index.html')
	#return render_template('answer.html', oski_answer=found_answer, speak=url_speech)

	# = request.POST['data'].json()

if __name__ == "__main__":
	app.run(debug=True)
