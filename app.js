var MongoClient = require('mongodb').MongoClient;

var myCollection;
var db = MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
    myCollection = db.collection('test_collection');
});
