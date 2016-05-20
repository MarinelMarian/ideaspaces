var server = require('./source/server').create();

server.register({
	register: require('hapi-cors')
}, function(err){
	server.start(function(){
		console.log(server.info.uri);
	});
});
