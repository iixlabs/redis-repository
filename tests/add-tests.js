var assert = require('assert'),
	redis = require('then-redis'),
	RedisRepository = require('../lib/RedisRepository.js'),
	REDIS_CONNECTION_STRING = "correct_connection_string";

suite('Test Add');

test('Given there is a redis connection when add is called on the repository then the correct set is added to',function(){
	var setAddedTo,
		set = 'users',
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			sadd: function(setName){
				setAddedTo = setName;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.add("");
	assert.equal(setAddedTo,set);
});

test('Given there is an unsucessful redis connection when add is called on the repository then an error is thrown',function(){
	var mockRedisClient = {
			then: function(success,failure){
				failure();
			},
			connect: function(){
				return this;
			},
			smembers:function(){},
			sadd: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
	
	assert.throws(
		function(){
			userRepository.add("");					
		}, 
		/Unable to establish a connection with the redis server/
	);
});

test('Given there is a redis connection when add is called on the repository then the correct item is added to the set',function(){
	var addedItem,
		item = "Hello",
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			sadd: function(setName,item){
				addedItem = item;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
	userRepository.add(item);
	assert.equal(addedItem,item);
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