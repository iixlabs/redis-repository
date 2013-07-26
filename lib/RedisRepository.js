var RedisRepository = function(redis,connectionString,repositoryType){
	var CONNECTION_ERROR_MESSAGE = "Unable to establish a connection with the redis server",
		client = redis.createClient(connectionString);

	
	function handleErrors(){
		throw new Error(CONNECTION_ERROR_MESSAGE);
	}

	function add(item){
		if(typeof(item) !== 'string'){
			item = JSON.stringify(item);
		}
		client
			.connect()
			.then(function(){
					client.sadd(repositoryType,item);
				},handleErrors);
	}

	function all(onResponse){

		client
			.connect()
			.then(function(){
				var items = client.smembers(repositoryType).then(onResponse);
			},handleErrors);
	}

	return{
		add: add,
		all: all
	};
};

module.exports = RedisRepository;