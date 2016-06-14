from flask import Flask, request, render_template
app = Flask(__name__)

answer_output = ''

@app.route("/")
def hello():
	return app.send_static_file('index.html')


@app.route("/api/ReadTextInput", methods=["POST"])
def receive_cheep():
	print(request.form)
	return "Sucess"

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
	print ("Kush")
	print(request.form['dream_content'])
	# print (request.get_json(force=True))
	return app.send_static_file('index.html')
	#return render_template('answer.html', oski_answer=found_answer, speak=url_speech)

	# = request.POST['data'].json()

if __name__ == "__main__":
	app.run(debug=True)
