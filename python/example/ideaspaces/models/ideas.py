from .. import db


class Ideas(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    # Additional fields

    def __repr__(self):
        return 'Ideas {}>'.format(self.id)
