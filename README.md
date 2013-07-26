# Redis Repository #


A simple repository structure using redis as the underlying storage. 

##Usage
add `redis-repository` to your `package.json` and import the redisRepositoryFactory:

    var redisRepositoryFactory = require('redis-repository'),
    
 
###creating a new set

    var catRepository = redisRepository.create(connectionString,'cat');

###Adding to the repository

    catRepository.add({name:'trevor'},function(){ 
        console.log('cat added!');
    });

###Getting data from the repository

    catRepository.all(function(cats){
        console.log('Look at all my kitties : ',cats);
    });

###Removing data from the repository

    catRepository.remove({name:'trevor'},function(){ 
        console.log('cat removed!');
    });



    
