from flask import Flask,jsonify

app = Flask(__name__)

@app.route('/api/v1/paciente')

def mensaje():
    return jsonify('Paciente')

if __name__ == '__name__'
    app.run(debug = True)