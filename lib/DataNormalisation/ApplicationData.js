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


module.exports = ApplicationData;