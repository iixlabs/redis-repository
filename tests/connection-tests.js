var assert = require('assert'),
	RedisRepository = require('../lib/RedisRepository.js');

suite('Test Connection');

test('When created then redis client is created',function(){
	var redisConnectionCreated,
		mockRedis = {
			createClient: function(){
				redisConnectionCreated = true;
			}
		};
	var redisRepository = new RedisRepository(mockRedis);
	assert.equal(redisConnectionCreated,true);
});

test('When created then redis client is created with correct connection string',function(){
	var connectionString = "jimmysavile@redistogo",
		redisConnectionString,
		mockRedis = {
			createClient: function(connectionString){
				redisConnectionString = connectionString;
			}
		};
	var redisRepository = new RedisRepository(mockRedis,connectionString);
	assert.equal(connectionString,redisConnectionString);
});

//var FakeRedis = function(redisClient){
//	function createClient(connectionString){
//		if(connectionString === process.env.REDIS_CONNECTION_STRING){
//			return redisClient;
//		}
//	}
//	return {
//		createClient:createClient
//	};
//};

	//client = redis.createClient('redis://redistogo:c8f559cb3fc3d2f0e9b2f17cb1ce6803@beardfish.redistogo.com:9457/');
	//client.sadd('users','julie');
	//console.log(client.smembers('users').then(function(values){
	//	console.log(values);
	//}));
	//console.log("poo")