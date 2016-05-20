var hapi = require('hapi');
var Boom = require('boom');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ideaService');

var IdeaModel = mongoose.model('myModel', new mongoose.Schema({
  member_id: String,
  ideaspace_id: String,
  title: String,
  description: String,
  isPublic: { type: Boolean, default: true },
}));

module.exports.create = function() {

  var server = new hapi.Server();
  server.connection({
      host: 'localhost',
      port: 8000
  });

  server.route({
    method: 'GET',
    path:'/ideas',
    handler: function (request, reply) {
      var query = {};

      if(request.query.member_id) {
        query.member_id = request.query.member_id;
      }

      if(request.query.exclude_member_id) {
        query.member_id = {
          $ne: request.query.exclude_member_id
        };

        query.isPublic = true;
      }

      IdeaModel.find(query).exec(function(err, data) {
        if (err) {
          return reply(Boom.badRequest('db error'));
        }

        return reply(JSON.stringify(data));
      });
    }
  });

  server.route({
    method: 'POST',
    path:'/ideas',
    handler: function (request, reply) {
      var idea = new IdeaModel(request.payload);

      idea.save(function (err, data) {
        if (err) {
          return reply(Boom.badRequest('db error'));
        }

        return reply(JSON.stringify(data));
      });
    }
  });

  server.route({
    method: 'DELETE',
    path:'/ideas/{id}',
    handler: function (request, reply) {
      var idea = new IdeaModel(request.payload);

      IdeaModel.remove({ _id: request.params.id }, function (err) {
        if (err) {
          return reply(Boom.badRequest('db error'));
        }

        return reply();
      });
    }
  });

  return server;
};
