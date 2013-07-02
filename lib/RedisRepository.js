var RedisRepository = function(redis,connectionString){
	redis.createClient(connectionString);
};

module.exports = RedisRepository;