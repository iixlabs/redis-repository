var assert = require('assert'),
	redis = require('then-redis'),
	RedisRepository = require('../lib/RedisRepository.js'),
	REDIS_CONNECTION_STRING = "correct_connection_string";

suite('Test Add');

test('Given there is a redis connection when add is called on the repository then the correct set is added to',function(){
	var connectionSuccesful = true,
		setAddedTo,
		set = 'users',
		mockRedisClient = {
			sadd: function(setName){
				setAddedTo = setName;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(connectionSuccesful,mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	userRepository.add("");
	assert.equal(setAddedTo,set);
});

test('Given there is an unsucessful redis connection when add is called on the repository then an error is thrown',function(){
	var connectionSuccesful = false,
		setAddedTo,
		set = 'users',
		mockRedisClient = {
			sadd: function(setName){
				setAddedTo = setName;
			}
		},
		fakeRedisConnection = new FakeRedisConnection(connectionSuccesful,mockRedisClient);

	var userRepository = new RedisRepository(fakeRedisConnection,REDIS_CONNECTION_STRING,set);
	
	assert.throws(
		function(){
			userRepository.add("");					
		}, 
		/Unable to establish a connection with the redis server/
	);
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



//test('When add called then add called on the correct set',function(){
//	client = redis.createClient('redis://redistogo:c8f559cghge3fc3d2f0e9b2f17cb1ce6803@beardfish.redistogo.com:9457/');
//	client.connect().then(function(connection){
//		connection.sadd('users','julie');
//	},function(errors){
//		console.log("Poo");
//	});
//	assert.equal(false,true);
//});



	//client = redis.createClient('redis://redistogo:c8f559cb3fc3d2f0e9b2f17cb1ce6803@beardfish.redistogo.com:9457/');
	//client.sadd('users','julie');
	//console.log(client.smembers('users').then(function(values){
	//	console.log(values);
	//}));
	//console.log("poo")