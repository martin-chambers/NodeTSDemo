/// <reference path="typings/tsd.d.ts" />
import http = require('http');
import express = require('express');  
import data = require("./data/index");
import * as homecontroller from "./controllers/homeController";
import * as personcontroller from "./controllers/personController";  
var app: express.Express = express();

// view
app.set("view engine", "jade");

// static resources
app.use(express.static(__dirname + "/public"));  

// router
var router: express.Router = express.Router();
app.use(router);

// body-parser
var bodyParser = require('body-parser');  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get('/', function(request: express.Request, response: express.Response) {	
	homecontroller.list(request, response);
});
app.get("/persons/:_id", function (request: express.Request, response: express.Response) {
	personcontroller.edit(request, response);		
});
app.get("/delete/:_id", function (request: express.Request, response: express.Response) {
	personcontroller.remove(request, response);		
});
app.get("/create", function (request: express.Request, response: express.Response) {
	personcontroller.create(request, response);		
});
app.post("/create", function (request: express.Request, response: express.Response) {
	personcontroller.insert(request, response);
}); 
app.post("/persons/:_id", function (request: express.Request, response: express.Response) {
	personcontroller.update(request, response);		
});
app.get("/help", function(request: express.Request, response: express.Response) {
	response.render('help');
});

// server
var port: number = process.env.port || 1337
var server: http.Server = http.createServer(app);

server.listen(port);

data.seedDatabase();
