from datetime import datetime

from main.models.db import db
from main.models import Client


class Socket(db.Model):

    __tablename__ = 'sockets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __repr__(self):
        return '<Socket %s>'.format(self.name)

    @property
    def serialize(self):
        client = Client.query.filter_by(id=self.client_id).first().serialize

        return dict(
            id=self.id,
            name=self.name,
            client=client,
            created=self.created,
            updated=self.updated
        )