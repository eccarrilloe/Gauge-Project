import json
from datetime import datetime
from flask import jsonify, make_response, request
from flask_jwt_extended import jwt_required

from main.models import db, Client


class ClientController:

    @classmethod
    @jwt_required
    def client_index(cls):
        clients = Client.query.all()
        clients = list(map(lambda x: x.serialize, clients))
        return make_response(jsonify(clients), 200)

    @classmethod
    @jwt_required
    def client_get(cls, client_id):
        client = Client.query.filter_by(id=client_id).first()
        return make_response(jsonify(client.serialize), 200)        

    @classmethod
    def client_create(cls):
        name = request.json.get('name', None)
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if name is None or email is None or password is None:
            return make_response(jsonify({ 'msg': 'Name, Email and Password are required' }), 400)

        client = Client(name=name, email=email, password=password)
        db.session.add(client)
        db.session.commit()

        return make_response(jsonify({ 'msg': 'Client "{}" created'.format(name) }), 200)

    @classmethod
    @jwt_required
    def client_update(cls, client_id):
        name = request.json.get('name', None)
        email = request.json.get('email', None)
        
        if name is None or email is None:
            return make_response(jsonify({ 'msg': 'Name and Email are required' }), 400)

        client = Client.query.filter_by(id=client_id).first()

        if client is None:
            return make_response(jsonify({ 'msg': 'Client not found' }), 404)

        client.name = name
        client.email = email

        db.session.commit()

        return make_response(jsonify({ 'msg': 'Client updated' }), 200)
    
    @classmethod
    @jwt_required
    def client_delete(cls, client_id):
        client = Client.query.filter_by(id=client_id).first()

        if client is None:
            return make_response(jsonify({ 'msg': 'Client not found' }), 404)

        db.session.delete(client)
        db.session.commit()

        return make_response(jsonify({ 'msg': 'Client deleted' }), 200)