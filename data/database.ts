/// <reference path="./../typings/tsd.d.ts" />
import express = require('express');
import mongodb = require('mongodb');
import * as model from "../model/index";
var mongoUrl = "mongodb://localhost:27017/testDB";
var myDb: model.Database;
export function getDatabase(callback: (error: Error, db: model.Database) => void) {	
	if(myDb === null || myDb === undefined) {
    mongodb.MongoClient.connect(mongoUrl, function(error, db) {
      if (error) {
            callback(error, null);
      } else {
            myDb = new model.Database(db, db.collection('persons'))
            callback(null, myDb);          
      }
    })
  } else {
    callback(null, myDb);  
  }  
}


