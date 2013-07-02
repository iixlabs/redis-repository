var assert = require('assert'),
	redis = require('then-redis'),
	RedisRepository = require('../lib/RedisRepository.js'),
	REDIS_CONNECTION_STRING = "correct_connection_string";

suite('Test All');

test('Given there is a redis connection when all is called on the repository then the correct set is read from',function(){
	var setReadFrom,
		set = 'users',
		mockRedisClient = {
			sadd: function(){},
			then: function(success){
				success();
			},
			connect: function(){
				return this;
			},
			smembers: function(setName){
				setReadFrom = setName;
				return this;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.all(function(){});
	assert.equal(setReadFrom,set);
});


test('Given there is an unsucessful redis connection when add is called on the repository then an error is thrown',function(){
	var mockRedisClient = {
			sadd: function(){},
			then: function(success,failure){
				failure();
			},
			connect: function(){
				return this;
			},
			smembers: function(){
				return this;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");	
	assert.throws(
		function(){
			var poo = userRepository.all(function(){});			
		}, 
		/Unable to establish a connection with the redis server/
	);
});

test('Given there is a redis connection when all is called on the repository then the correct set is read from',function(){
	var set = 'users',
		users = ['Jimmy','Max','Ken'],
		usersFromRedis,
		mockRedisClient = {
			sadd: function(){},
			smembers: function(){
				return this;
			},
			then: function(success){
				success(users);
			},
			connect: function(){
				return this;
			},
		},
		redisResponse = function(users){
			usersFromRedis = users;
		};
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.all(redisResponse);
	assert.equal(usersFromRedis,users);
});

var FakeRedisConnection = function(redisClient){
	function createClient(connectionString){
		if(connectionString === REDIS_CONNECTION_STRING){
			return redisClient;
		}
	}
	return{
		createClient: createClient,
	};
};



	