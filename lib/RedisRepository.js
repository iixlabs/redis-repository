var RedisRepository = function(redis,connectionString,repositoryType){
	var CONNECTION_ERROR_MESSAGE = "Unable to establish a connection with the redis server",
		client = redis.createClient(connectionString);
	
	function add(item){
		client.connect().then(addToRepository,handleErrors);
	}

	function addToRepository(connection){
		connection.sadd(repositoryType,null);
	}

	function handleErrors(){
		throw new Error(CONNECTION_ERROR_MESSAGE);
	}

	return{
		add: add
	};
};

module.exports = RedisRepository;