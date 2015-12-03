var mongodb = require('mongodb');
var seedData = require("./seeddata");
var database = require("./database");
function getPersons(callback) {
    database.getDatabase(function (error, database) {
        if (error) {
            callback(error, null);
        }
        else {
            database.persons.find().sort({ name: 1 }).toArray(function (error, personObjects) {
                if (error) {
                    callback(error, null);
                }
                else {
                    callback(null, personObjects);
                }
            });
        }
    });
}
exports.getPersons = getPersons;
function getPerson(_id, callback) {
    var cursor;
    var o_id = new mongodb.ObjectID(_id);
    database.getDatabase(function (error, database) {
        if (error) {
            callback(error, null);
        }
        else {
            cursor = database.persons.find({ "_id": o_id });
            // we assume only one result
            cursor.each(function (error, person) {
                if (error) {
                    callback(error, null);
                }
                else {
                    // the iteration returns a null item at the end - not sure why!
                    if (person !== null) {
                        callback(null, person);
                    }
                }
            });
        }
    });
}
exports.getPerson = getPerson;
function addPerson(personToAdd, callback) {
    database.getDatabase(function (error, database) {
        if (error) {
            callback(error);
        }
        else {
            database.persons.insertOne(personToAdd, callback);
        }
    });
}
exports.addPerson = addPerson;
function deletePerson(_id, callback) {
    var o_id = new mongodb.ObjectID(_id);
    database.getDatabase(function (error, database) {
        if (error) {
            console.log("Failed to get database: " + error);
            callback(error, name);
        }
        else {
            database.persons.deleteOne({ "_id": o_id }, callback);
        }
    });
}
exports.deletePerson = deletePerson;
function updatePerson(_id, personToUpdate, callback) {
    var o_id = new mongodb.ObjectID(_id);
    database.getDatabase(function (error, database) {
        if (error) {
            console.log("Failed to get database: " + error);
            callback(error, personToUpdate);
        }
        else {
            database.persons.updateOne({ "_id": o_id }, {
                $set: { "name": personToUpdate.name, "age": personToUpdate.age }
            }, callback);
        }
    });
}
exports.updatePerson = updatePerson;
function seedDatabase() {
    database.getDatabase(function (error, database) {
        if (error) {
            console.log('Failed to get database' + error.message);
        }
        else {
            database.persons.count(function (error, count) {
                if (error) {
                    console.log('Failed to retrieve database count' + error.message);
                }
                else {
                    if (count !== 8) {
                        database.persons.drop(function (error, response) {
                            if (error) {
                                console.log('Could not drop persons table' + error.message);
                            }
                            else {
                                console.log('Dropped persons table: response = ' + response);
                            }
                        });
                        seedData.persons().forEach(function (p) {
                            database.persons.insertOne(p, function (error, item) {
                                if (error) {
                                    console.log('Failed to insert person into database' + error.message);
                                }
                            });
                        });
                    }
                    else {
                        console.log("Database already seeded");
                    }
                }
            });
        }
    });
}
exports.seedDatabase = seedDatabase;
