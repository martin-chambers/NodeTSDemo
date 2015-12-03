var data = require("../data/index");
function list(request, response) {
    data.getPersons(function (error, persons) {
        response.render("index", {
            "persons": persons,
            "title": "NodeJS Demo"
        });
    });
}
exports.list = list;
