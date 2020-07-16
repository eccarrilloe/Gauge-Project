from datetime import datetime
import flask_bcrypt

from main.models.db import db
from main.models.client_roles import client_roles


class Client(db.Model):

    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated = db.Column(db.DateTime, nullable=False, default=datetime.now)

    sockets = db.relationship('Socket', backref='client', lazy=True)
    roles = db.relationship('Role', secondary=client_roles, lazy='subquery', backref=db.backref('clients', lazy=True))

    @property
    def password(self):
        raise AttributeError('Password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User "%s">'.format(self.name)

    @property
    def serialize(self):
        return dict(
            id=self.id,
            name=self.name,
            email=self.email,
            created=self.created,
            updated=self.updated
        )