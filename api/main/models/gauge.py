from main.models.db import db


class Gauge(db.Model):

    __tablename__ = 'gauges'

    id = db.Column(db.Integer, primary_key=True)
    socket_id = db.Column(db.Integer, db.ForeignKey('sockets.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return '<Gauge %s>'.format(self.name)

    @property
    def serialize(self):
        socket = Socket.query.filter_by(id=self.socket_id).first().serialize
        client = Client.query.filter_by(id=self.client_id).first().serialize

        return dict(
            id=self.id,
            name=self.name,
            socket=socket,
            client=client,
            created=self.created,
            updated=self.updated
        )