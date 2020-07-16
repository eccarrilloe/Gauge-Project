from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from main.models.db import db
from main.routes import load_routes
from main.config import config_by_name


def create_app(config_name):
    application = Flask(__name__)
    jwt = JWTManager(application)
    flask_bcrypt = Bcrypt()

    application.config.from_object(config_by_name[config_name])
    flask_bcrypt.init_app(application)
    db.init_app(application)
    load_routes(application)

    return application
    

if __name__ == '__main__':
    app = create_app('dev')
    app.run(port=8080, debug=True)