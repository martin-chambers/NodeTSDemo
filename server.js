/// <reference path="typings/tsd.d.ts" />
var http = require('http');
var express = require('express');
var data = require("./data/index");
var homecontroller = require("./controllers/homeController");
var personcontroller = require("./controllers/personController");
var app = express();
// view
app.set("view engine", "jade");
// static resources
app.use(express.static(__dirname + "/public"));
// router
var router = express.Router();
app.use(router);
// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.get('/', function (request, response) {
    homecontroller.list(request, response);
});
app.get("/persons/:_id", function (request, response) {
    personcontroller.edit(request, response);
});
app.get("/delete/:_id", function (request, response) {
    personcontroller.remove(request, response);
});
app.get("/create", function (request, response) {
    personcontroller.create(request, response);
});
app.post("/create", function (request, response) {
    personcontroller.insert(request, response);
});
app.post("/persons/:_id", function (request, response) {
    personcontroller.update(request, response);
});
app.get("/help", function (request, response) {
    response.render('help');
});
// server
var port = process.env.port || 1337;
var server = http.createServer(app);
server.listen(port);
data.seedDatabase();
