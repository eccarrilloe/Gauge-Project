import json
from datetime import datetime
from flask import jsonify, make_response, request
from flask_jwt_extended import jwt_required

from main.models import db, Client, Socket, Gauge


class GaugeController:

    @classmethod
    @jwt_required
    def gauge_index(cls, socket_id):
        gauges = Socket.query.filter_by(socket_id=socket_id).all()
        gauges = list(map(lambda x: x.serialize, gauges))
        return make_response(jsonify(gauges), 200)

    @classmethod
    @jwt_required
    def gauge_get(cls, socket_id, gauge_id):
        gauge = Gauge.query.filter_by(id=gauge_id).first()
        return make_response(jsonify(gauge.serialize), 200)        

    @classmethod
    @jwt_required
    def gauge_create(cls, socket_id):
        name = request.json.get('name', None)

        if name is None:
            return make_response(jsonify({ 'msg': 'Name is required' }), 400)

        gauge = Gauge(name=name, socket_id=docket_id)
        db.session.add(gauge)
        db.session.commit()

        return make_response(jsonify({ 'msg': 'Gauge "{}" created'.format(name) }), 200)

    @classmethod
    @jwt_required
    def gauge_update(cls, socket_id, gauge_id):
        name = request.json.get('name', None)
        
        if name is None:
            return make_response(jsonify({ 'msg': 'Name is required' }), 400)

        gauge = Gauge.query.filter_by(id=gauge_id).first()

        if gauge is None:
            return make_response(jsonify({ 'msg': 'Gauge not found' }), 404)

        gauge.name = name

        db.session.commit()

        return make_response(jsonify({ 'msg': 'Gauge updated' }), 200)
    
    @classmethod
    @jwt_required
    def gauge_delete(cls, socket_id, gauge_id):
        gauge = Gauge.query.filter_by(id=gauge_id).first()

        if gauge is None:
            return make_response(jsonify({ 'msg': 'Gauge not found' }), 404)

        db.session.delete(gauge)
        db.session.commit()

        return make_response(jsonify({ 'msg': 'Gauge deleted' }), 200)