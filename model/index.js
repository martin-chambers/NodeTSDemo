function clean(input) {
    return input.replace(/\W/g, ' ').trim();
}
exports.clean = clean;
var Person = (function () {
    function Person(_id, name, age) {
        this._id = _id;
        this.name = name;
        this.age = age;
    }
    return Person;
})();
exports.Person = Person;
var Database = (function () {
    function Database(db, persons) {
        this.db = db;
        this.persons = persons;
    }
    return Database;
})();
exports.Database = Database;
