import express = require('express');
import mongodb = require('mongodb');
import * as seedData from "./seeddata";
import * as model from "../model/index";
import * as database from "./database";

export function getPersons (callback: (error: Error, persons: model.Person[]) => void) {
	database.getDatabase(function (error, database) {
		if(error) {
			callback(error, null);
		} else {
			database.persons.find().sort({name:1}).toArray(function(error, personObjects) {
				if(error) {
					callback(error, null);
				} else {
					callback(null, personObjects);
				}
			})
		}  
	})
}

export function getPerson (_id: string, callback: (error: Error, p: model.Person) => void) {
	var cursor: mongodb.Cursor;
	var o_id: mongodb.ObjectID = new mongodb.ObjectID(_id);
	database.getDatabase(function (error, database) {
		if(error) {
			callback(error, null);
		} else {
			cursor = database.persons.find({ "_id": o_id });
			// we assume only one result
			cursor.each(function(error, person) {
				if(error) {
					callback(error, null);
				} else {
					// the iteration returns a null item at the end - not sure why!
					if(person !== null) {
						callback(null, person);
					}
				}
			})
		}  
	})
}

export function addPerson(personToAdd: model.Person, callback: (error: Error) => void ) {
	database.getDatabase(function(error, database) {
		if(error) {
			callback(error);
		} else {
			database.persons.insertOne(personToAdd, callback)
		}
	})	
}

export function deletePerson(_id: string, callback: (error: Error, name: string) => void ) {
	var o_id: mongodb.ObjectID = new mongodb.ObjectID(_id);
	database.getDatabase(function(error, database) {
		if (error) {
			console.log("Failed to get database: " + error);
			callback(error, name);
		} else {
			database.persons.deleteOne( {"_id": o_id }, callback)
		}
	})
}

export function updatePerson(_id: string, personToUpdate: model.Person, callback: (error: Error, p: model.Person) => void) {
	var o_id: mongodb.ObjectID = new mongodb.ObjectID(_id);
	database.getDatabase(function(error, database) {
			if (error) {
				console.log("Failed to get database: " + error);
				callback(error, personToUpdate);
			} else {
				database.persons.updateOne( {"_id": o_id}, {
					$set: {"name": personToUpdate.name, "age": personToUpdate.age}					
				},callback)
			}
	})
}

export function seedDatabase() {
	database.getDatabase(function (error, database) {
		if(error) {
			console.log('Failed to get database: ' + error.message);
		} else {
			database.persons.count(function(error, count) {
				if(error) {
					console.log('Failed to retrieve database count: ' + error.message);
				} else {
					if(count!==8) {
						database.persons.drop(function(error, response) {
							if(error) {
								console.log('Could not drop persons table: ' + error.message);
							} else {
								console.log('Dropped persons table: response = ' + response);
							}	
						});
						seedData.persons().forEach(function(p) {
							database.persons.insertOne(p, function(error, item) {
								if(error) {
									console.log('Failed to insert person into database: ' + error.message)
								}
							})
						})
					} else {
						console.log("Database already seeded");
					}
				}				
			})		
		}
	})
}