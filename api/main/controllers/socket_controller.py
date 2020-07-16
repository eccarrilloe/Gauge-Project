import json
from datetime import datetime
from flask import jsonify, make_response, request
from flask_jwt_extended import jwt_required

from main.models import db, Client, Socket


class SocketController:

    @classmethod
    @jwt_required
    def socket_index(cls, client_id):
        sockets = Socket.query.filter_by(client_id=client_id).all()
        sockets = list(map(lambda x: x.serialize, sockets))
        return make_response(jsonify(sockets), 200)

    @classmethod
    @jwt_required
    def socket_get(cls, client_id, socket_id):
        socket = Socket.query.filter_by(id=socket_id).first()
        return make_response(jsonify(socket.serialize), 200)        

    @classmethod
    @jwt_required
    def socket_create(cls, client_id):
        name = request.json.get('name', None)

        if name is None:
            return make_response(jsonify({ 'msg': 'Name is required' }), 400)

        socket = Socket(name=name, client_id=client_id)
        db.session.add(socket)
        db.session.commit()

        return make_response(jsonify({ 'msg': 'Socket "{}" created'.format(name) }), 200)

    @classmethod
    @jwt_required
    def socket_update(cls, client_id, socket_id):
        name = request.json.get('name', None)
        
        if name is None:
            return make_response(jsonify({ 'msg': 'Name is required' }), 400)

        socket = Socket.query.filter_by(id=socket_id).first()

        if socket is None:
            return make_response(jsonify({ 'msg': 'Socket not found' }), 404)

        socket.name = name

        db.session.commit()

        return make_response(jsonify({ 'msg': 'Socket updated' }), 200)
    
    @classmethod
    @jwt_required
    def socket_delete(cls, client_id, socket_id):
        socket = Socket.query.filter_by(id=socket_id).first()

        if socket is None:
            return make_response(jsonify({ 'msg': 'Socket not found' }), 404)

        db.session.delete(socket)
        db.session.commit()

        return make_response(jsonify({ 'msg': 'Socket deleted' }), 200)