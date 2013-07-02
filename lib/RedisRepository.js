var RedisRepository = function(redis,connectionString,repositoryType){
	var CONNECTION_ERROR_MESSAGE = "Unable to establish a connection with the redis server",
		client = redis.createClient(connectionString);
	
	function handleErrors(){
		throw new Error(CONNECTION_ERROR_MESSAGE);
	}
	
	function add(item){
		client
			.connect()
			.then(function(connection){
					connection.sadd(repositoryType,item);
				},handleErrors);
	}

	function all(onResponse){
		client
			.connect()
			.then(function(connection){
				var items = connection.smembers(repositoryType);
				onResponse(items);
			},handleErrors);
	}

	return{
		add: add,
		all: all
	};
};

module.exports = RedisRepository;