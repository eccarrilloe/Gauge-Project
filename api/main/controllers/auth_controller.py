from flask import jsonify, make_response, request
from flask_jwt_extended import create_access_token
from main.models import Client


class AuthController:

    @classmethod
    def login(cls):
        if not request.is_json:
            return make_response(jsonify({'msg': 'Missing JSON in request'}), 400)

        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not email:
            return make_response(jsonify({'msg': 'Missing email parameter'}), 400)

        if not password:
            return make_response(jsonify({'msg': 'Missing password parameter'}), 400)

        
        client = Client.query.filter_by(email=email).first()

        if client is None:
            return make_response(jsonify({'msg': 'User/Password are invalid'}), 401)

        valid_login = client.check_password(password)

        if not valid_login:
            return make_response(jsonify({'msg': 'User/Password are invalid'}), 401)

        access_token = create_access_token(identity=email)
        return make_response(jsonify(access_token=access_token), 200)
