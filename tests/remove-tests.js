var assert = require('assert'),
	redis = require('then-redis'),
	RedisRepository = require('../lib/RedisRepository.js'),
	REDIS_CONNECTION_STRING = "correct_connection_string";

suite('Test Remove');

test('Given there is a redis connection when remove is called on the repository then the correct set is removed from',function(){
	var setRemovedFrom,
		set = 'users',
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			srem: function(setName){
				setRemovedFrom = setName;
				return this;
			},
			quit: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.remove("",function(){});
	assert.equal(setRemovedFrom,set);
});

test('Given there is an unsucessful redis connection when remove is called on the repository then an error is thrown',function(){
	var mockRedisClient = {
			then: function(success,failure){
				failure();
			},
			connect: function(){
				return this;
			},
			smembers:function(){},
			srem: function(){
				return this;
			},
			quit: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
	
	assert.throws(
		function(){
			userRepository.remove("",function(){});					
		}, 
		/Unable to establish a connection with the redis server/
	);
});

test('Given there is a redis connection when add is called on the repository then the correct item is removed to the set',function(){
	var removedItem,
		item = "Hello",
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			srem: function(setName,item){
				removedItem = item;
				return this;
			},
			quit: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
	userRepository.remove(item,function(){});
	assert.equal(removedItem,item);
});

test('Given there is a redis connection when remove is called on the repository then the correct item is removed to the set',function(){
	var removedItem,
		item = {name:"bob"},
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			srem: function(setName,item){
				removedItem = item;
				return this;
			},
			quit: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
	userRepository.remove(item,function(){});
	assert.equal(removedItem,JSON.stringify(item));
});


test('Given there is a redis connection when remove is called on the repository then callback is called',function(){
	var setAddedTo,
		set = 'users',
		callbackCalled,
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			srem: function(setName,callback){
				return this;
			},
			quit: function(){}
		},
		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.remove("",function(){
		callbackCalled = true;
	});
	assert.equal(true,callbackCalled);
});

test('Given there is a redis connection when remove is called on the repository then the connection is closed',function(){
	var set = 'users',
		connectionClosed = false,
		mockRedisClient = {
			then: function(success){
				success();
			},
			smembers:function(){},
			connect: function(){
				return this;
			},
			srem: function(setName,callback){
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
	userRepository.remove("",function(){});
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