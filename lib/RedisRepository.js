var ApplicationData = require('./DataNormalisation/ApplicationData'),
	RedisData = require('./DataNormalisation/RedisData');

var RedisRepository = function(redis,connectionString,repositoryType){
	var CONNECTION_ERROR_MESSAGE = "Unable to establish a connection with the redis server",
		client = redis.createClient(connectionString),
		applicationData = new ApplicationData(),
		redisData = new RedisData();

	
	function handleErrors(){
		throw new Error(CONNECTION_ERROR_MESSAGE);
	}

	function add(item,callback){
		client
			.connect()
			.then(function(){
					client.sadd(repositoryType,applicationData.normalise(item)).then(function(){
						client.quit();
						callback();
					});
				},handleErrors);
	}

	function all(onResponse){
		client
			.connect()
			.then(function(){
				var items = client.smembers(repositoryType).then(function(items){
					client.quit();
					onResponse(redisData.normalise(items));
				});
			},handleErrors);
	}
	function remove(item,callback){
		client
			.connect()
			.then(function(){
				client.srem(repositoryType,applicationData.normalise(item)).then(function(){
					client.quit();
					callback();
				});
			},handleErrors);
	}

	return{
		add: add,
		all: all,
		remove: remove
	};
};

module.exports = RedisRepository;