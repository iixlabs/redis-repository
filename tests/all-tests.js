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
				success([]);
			},
			connect: function(){
				return this;
			},
			smembers: function(setName){
				setReadFrom = setName;
				return this;
			},
			quit: function(){}
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
			},
			quit: function(){}
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
			quit: function(){}
		},
		redisResponse = function(users){
			usersFromRedis = users;
		};
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.all(redisResponse);
	assert.deepEqual(usersFromRedis,users);
});

test('Given there is a redis connection when all is called on the repository then the correct object is returned from redis',function(){
	var set = 'users',
		users = [],
		user = {name: "bob"},
		usersFromRedis,
		mockRedisClient = {
			sadd: function(setname,item){
				users.push(item);
				return this;
			},
			smembers: function(){
				return this;
			},
			then: function(success){
				success(users);
			},
			connect: function(){
				return this;
			},
			quit: function(){}
		},
		redisResponse = function(users){
			usersFromRedis = users;
		};
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);
	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.add(user,function(){});
	userRepository.all(redisResponse);
	assert.deepEqual(usersFromRedis[0],user);
});

test('Given there is a redis connection when all is called on the repository then the connection is closed',function(){
	var set = 'users',
		connectionClosed = false,
		mockRedisClient = {
			then: function(success){
				success([]);
			},
			smembers: function(){
				return this;
			},
			connect: function(){
				return this;
			},
			sadd: function(setName,callback){
				return this;
			},
			quit: function(){
				connectionClosed = true;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.all(function(){});
	assert.equal(true,connectionClosed);
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



	