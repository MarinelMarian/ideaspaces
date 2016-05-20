var hapi = require('hapi');
var boom = require('boom');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ideaService');

var IdeaModel = mongoose.model('myModel', new mongoose.Schema({
	member_id: String,
  ideaspace_id: String,
  title: String,
  description: String
}));

module.exports.create = function() {

  var server = new hapi.Server();
  server.connection({
      host: 'localhost',
      port: 8000
  });

  server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {

      IdeaModel.find().exec(function(err, data) {
        if (err) {
          return reply(Boom.badRequest('db error'));
        }

        console.log(data);

        return reply("ok");
      });
    }
  });

  server.route({
    method: 'POST',
    path:'/',
    handler: function (request, reply) {
      var idea = new IdeaModel(request.payload);

      idea.save(function (err) {
        if (err) {
          return reply(Boom.badRequest('db error'));
        }

        return reply("ok");
      });
    }
  });

  return server;
};
