/// <reference path="./../typings/tsd.d.ts" />
import express = require('express');
import mongodb = require('mongodb');
import data = require ("../data/index");
import * as model from "../model/index";

var x = 'person';


export function edit(request: express.Request, response: express.Response) {
    var _id: string = request.params._id;
    data.getPerson(_id, function (error, person) {
        if(error) {
            console.log('could not retrieve: ' + _id)
        }
        response.render("edit", {
            "_id": _id,
            "name": person.name,
            "age": person.age
        });
    })
}

export function update(request: express.Request, response: express.Response) {
    var _id: string = request.params._id;
    var person: model.Person = 
        new model.Person(request.body._id, request.body.name, parseInt(request.body.age));         
    data.updatePerson(_id, person, function(error, person) {
        if(error) {
            console.log('could not update: ' + person.name)
        }
        response.redirect('/');  
    });    
}

export function create(request: express.Request, response: express.Response) {
        response.render("edit", {
            "name": "",
            "age": ""
        })
}

export function insert(request: express.Request, response: express.Response) {
    var person: model.Person = 
        new model.Person(null, request.body.name, parseInt(request.body.age));
    data.addPerson(person, function(error) {
        if(error) {
            console.log('could not add: ' + person.name)
        }
        response.redirect('/');        
    })  
}

export function remove(request: express.Request, response: express.Response) {
    var _id: string = request.params._id;
    data.deletePerson(_id, function(error, name) {
        if(error) {
            console.log('could not delete: ' + _id)
        }
        response.redirect('/');        
    })  
}
