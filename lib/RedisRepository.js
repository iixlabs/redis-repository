var RedisRepository = function(redis,connectionString,repositoryType){
	var CONNECTION_ERROR_MESSAGE = "Unable to establish a connection with the redis server",
		client = redis.createClient(connectionString);

	
	function handleErrors(){
		throw new Error(CONNECTION_ERROR_MESSAGE);
	}

	function add(item){
		client
			.connect()
			.then(function(){
					client.sadd(repositoryType,serialise(item));
				},handleErrors);
	}

	function serialise(item){
		if(typeof(item) === 'string'){
			return item;
		}
		return JSON.stringify(item);
	}

	function all(onResponse){
		client
			.connect()
			.then(function(){
				var items = client.smembers(repositoryType).then(function(items){
					onResponse(deserialise(items));
				});
			},handleErrors);
	}

	function deserialise(items){
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

	return{
		add: add,
		all: all
	};
};

module.exports = RedisRepository;