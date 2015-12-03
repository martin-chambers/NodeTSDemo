var mongodb = require('mongodb');
var model = require("../model/index");
var mongoUrl = "mongodb://localhost:27017/testDB";
var myDb;
function getDatabase(callback) {
    if (myDb === null || myDb === undefined) {
        mongodb.MongoClient.connect(mongoUrl, function (error, db) {
            if (error) {
                callback(error, null);
            }
            else {
                myDb = new model.Database(db, db.collection('persons'));
                callback(null, myDb);
            }
        });
    }
    else {
        callback(null, myDb);
    }
}
exports.getDatabase = getDatabase;
