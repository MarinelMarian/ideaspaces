from .. import ma
from ..models.ideas import Ideas


class IdeasSchema(ma.ModelSchema):

    class Meta:
        model = Ideas


ideas_schema = IdeasSchema()
ideas_schema = IdeasSchema(many=True)
