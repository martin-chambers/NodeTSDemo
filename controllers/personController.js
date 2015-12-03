var data = require("../data/index");
var model = require("../model/index");
var x = 'person';
function edit(request, response) {
    var _id = request.params._id;
    data.getPerson(_id, function (error, person) {
        if (error) {
            console.log('could not retrieve: ' + _id);
        }
        response.render("edit", {
            "_id": _id,
            "name": person.name,
            "age": person.age
        });
    });
}
exports.edit = edit;
function update(request, response) {
    var _id = request.params._id;
    var person = new model.Person(request.body._id, request.body.name, parseInt(request.body.age));
    data.updatePerson(_id, person, function (error, person) {
        if (error) {
            console.log('could not update: ' + person.name);
        }
        response.redirect('/');
    });
}
exports.update = update;
function create(request, response) {
    response.render("edit", {
        "name": "",
        "age": ""
    });
}
exports.create = create;
function insert(request, response) {
    var person = new model.Person(null, request.body.name, parseInt(request.body.age));
    data.addPerson(person, function (error) {
        if (error) {
            console.log('could not add: ' + person.name);
        }
        response.redirect('/');
    });
}
exports.insert = insert;
function remove(request, response) {
    var _id = request.params._id;
    data.deletePerson(_id, function (error, name) {
        if (error) {
            console.log('could not delete: ' + _id);
        }
        response.redirect('/');
    });
}
exports.remove = remove;
