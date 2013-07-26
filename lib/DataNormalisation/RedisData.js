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


module.exports = RedisData;