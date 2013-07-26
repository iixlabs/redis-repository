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
			}
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
			}
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

// test('Given there is a redis connection when add is called on the repository then the correct item is added to the set',function(){
// 	var addedItem,
// 		item = "Hello",
// 		mockRedisClient = {
// 			then: function(success){
// 				success();
// 			},
// 			smembers:function(){},
// 			connect: function(){
// 				return this;
// 			},
// 			sadd: function(setName,item){
// 				addedItem = item;
// 				return this;
// 			}
// 		},
// 		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

// 	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
// 	userRepository.add(item,function(){});
// 	assert.equal(addedItem,item);
// });

// test('Given there is a redis connection when add is called on the repository then the correct item is added to the set',function(){
// 	var addedItem,
// 		item = {name:"bob"},
// 		mockRedisClient = {
// 			then: function(success){
// 				success();
// 			},
// 			smembers:function(){},
// 			connect: function(){
// 				return this;
// 			},
// 			sadd: function(setName,item){
// 				addedItem = item;
// 				return this;
// 			}
// 		},
// 		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

// 	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,"");
// 	userRepository.add(item,function(){});
// 	assert.equal(addedItem,JSON.stringify(item));
// });


// test('Given there is a redis connection when add is called on the repository then callback is called',function(){
// 	var setAddedTo,
// 		set = 'users',
// 		callbackCalled,
// 		mockRedisClient = {
// 			then: function(success){
// 				success();
// 			},
// 			smembers:function(){},
// 			connect: function(){
// 				return this;
// 			},
// 			sadd: function(setName,callback){
// 				setAddedTo = setName;
// 				return this;
// 			}
// 		},
// 		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

// 	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
// 	userRepository.add("",function(){
// 		callbackCalled = true;
// 	});
// 	assert.equal(true,callbackCalled);
// });

// test('Given there is a redis connection when add is called on the repository then callback is called',function(){
// 	var setAddedTo,
// 		set = 'users',
// 		callbackCalled,
// 		mockRedisClient = {
// 			then: function(success){
// 				success();
// 			},
// 			smembers:function(){},
// 			connect: function(){
// 				return this;
// 			},
// 			sadd: function(setName,callback){
// 				setAddedTo = setName;
// 				return this;
// 			}
// 		},
// 		fakeRedisConnection = new FakeRedisConnection(mockRedisClient);

// 	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
// 	userRepository.add("",function(){
// 		callbackCalled = true;
// 	});
// 	assert.equal(true,callbackCalled);
// });



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