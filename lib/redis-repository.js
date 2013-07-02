var redis = require('then-redis'),
	RedisRepository = require('./RedisRepository.js'),
	response = function(users){
		console.log(users);
	};


//var redisRepository = new RedisRepository(redis,'redis://redistogo:c8f559cb3fc3d2f0e9b2f17cb1ce6803@beardfish.redistogo.com:9457/','users');



	client = redis.createClient('redis://redistogo:c8f559cb3fc3d2f0e9b2f17cb1ce6803@beardfish.redistogo.com:9457/');
	client.sadd('users','bob');
	console.log(client.smembers('users').then(function(values){
	console.log(values);
	}));
	console.log("poo");


