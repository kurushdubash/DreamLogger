from flask import Flask, send_from_directory, render_template

app = Flask(__name__)


@app.route("/")
def hello():
	return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

if __name__ == "__main__":
	app.run(debug=False)
