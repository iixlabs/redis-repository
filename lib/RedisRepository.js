var RedisRepository = function(redis,connectionString,repositoryType){
	var CONNECTION_ERROR_MESSAGE = "Unable to establish a connection with the redis server",
		client = redis.createClient(connectionString),
		applicationData = new ApplicationData(),
		redisData = new RedisData();

	
	function handleErrors(){
		throw new Error(CONNECTION_ERROR_MESSAGE);
	}

	function add(item){
		client
			.connect()
			.then(function(){
					client.sadd(repositoryType,applicationData.normalise(item));
				},handleErrors);
	}

	function all(onResponse){
		client
			.connect()
			.then(function(){
				var items = client.smembers(repositoryType).then(function(items){
					onResponse(redisData.normalise(items));
				});
			},handleErrors);
	}

	return{
		add: add,
		all: all
	};
};

module.exports = RedisRepository;

var ApplicationData = function(){
	function normalise(item){
		if(typeof(item) === 'string'){
			return item;
		}
		return JSON.stringify(item);
	}

	return {
		normalise:normalise
	};
};

var RedisData = function(){
	function normalise(items){
		var deserialisedItems = [];
		for (var i=0;i<items.length;i++){
			var deserialisedItem;
			try{
				deserialisedItem = JSON.parse(items[i]);
			}
			catch(e){
				deserialisedItem = items[i];
			}
			deserialisedItems.push(deserialisedItem);
		}
		return deserialisedItems;
	}

	return {
		normalise:normalise
	};
};