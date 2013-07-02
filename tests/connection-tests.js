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