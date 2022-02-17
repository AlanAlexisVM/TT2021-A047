from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from flask_cors import CORS

from config import config

# Models:
from models.ModelUser import ModelUser

# Entities:
from models.entities.User import User

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db = MySQL(app)

@app.route('/api/guardarpaciente', methods=["GET"])
def mensaje():
    return jsonify('Prueba Flask')


if __name__ == '__main__':
    app.run(debug=True, port=4000)