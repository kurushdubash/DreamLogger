from flask import Flask, request, render_template
from database import add_entry, get_user_id_from_accountd_DB
import init_db

app = Flask(__name__)


answer_output = ''

@app.route("/")
def hello():
	return app.send_static_file('index.html')


@app.route("/api/login", methods=["POST"])
def login():
	username = request.form['username']
	password = request.form['psw']
	user_id = get_user_id_from_accountd_DB(username, password)
	if(user_id != 0):
		return render_template('dream_logger.html')
	else:
		return app.send_static_file('index_bad_auth.html')

@app.route("/api/GetQuestion", methods=["POST"])
def get_question():
	transcribed_audio = request.get_json(force=True)
	print(transcribed_audio)
	found_answer = "test"
	url_speech = "test"
	print(found_answer)
	return render_template('answer.html', oski_answer=found_answer, speak=url_speech)

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
