const console = require("console");

const Person = function () {
    this.name = 'Mango';
}

const person = new Person();
console.log('person name: ', person.name);