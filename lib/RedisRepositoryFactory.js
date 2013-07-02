var redis = require('then-redis'),
	RedisRepository = require('./RedisRepository.js');

var RedisRepositoryFactory = function(){
	function create(connectionString,repositoryType){
		return new RedisRepository(redis,connectionString, repositoryType);
	}

	return{
		create:create
	};
};

module.exports = RedisRepositoryFactory;