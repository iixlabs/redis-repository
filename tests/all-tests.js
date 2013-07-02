var assert = require('assert'),
	redis = require('then-redis'),
	RedisRepository = require('../lib/RedisRepository.js'),
	REDIS_CONNECTION_STRING = "correct_connection_string";

suite('Test All');

test('Given there is a redis connection when all is called on the repository then the correct set is read from',function(){
	var connectionSuccesful = true,
		setReadFrom,
		set = 'users',
		mockRedisClient = {
			sadd: function(){},
			smembers: function(setName){
				setReadFrom = setName;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(connectionSuccesful,mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.all(function(){});
	assert.equal(setReadFrom,set);
});


test('Given there is an unsucessful redis connection when add is called on the repository then an error is thrown',function(){
	var connectionSuccesful = false,
		mockRedisClient = {
			sadd: function(){},
			smembers: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(connectionSuccesful,mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");	
	assert.throws(
		function(){
			var poo = userRepository.all(function(){});			
		}, 
		/Unable to establish a connection with the redis server/
	);
});

test('Given there is a redis connection when all is called on the repository then the correct set is read from',function(){
	var connectionSuccesful = true,
		set = 'users',
		users = ['Jimmy','Max','Ken'],
		usersFromRedis,
		mockRedisClient = {
			sadd: function(){},
			smembers: function(){
				return users;
			}
		},
		redisResponse = function(users){
			usersFromRedis = users;
		};
		fakeRedisConnection = new FakeRedisConnection(connectionSuccesful,mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.all(redisResponse);
	assert.equal(usersFromRedis,users);
});



var FakeRedisConnection = function(connectionSucessful,redisClient){
	function createClient(connectionString){
		if(connectionString === REDIS_CONNECTION_STRING){
			return this;
		}
	}
	function then(success,failure){
		if(connectionSucessful === true){
			success(redisClient);
		}
		else{
			failure();
		}
	}
	function connect(){
		return this;
	}
	return{
		createClient: createClient,
		then: then,
		connect: connect
	};
};