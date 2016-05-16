from flask import jsonify, request

from . import api
from .. import db
from ..models.ideas import Ideas
from ..schemas.ideas import ideas_schema, ideas_schema


@api.route('/ideas', methods=['GET'])
def get_ideas():
    return jsonify(hello='ideas')


@api.route('/ideas/<int:id>', methods=['GET'])
def get_idea_by_id(id):
    return jsonify({'hello' : 'idea ' + str(id)})
