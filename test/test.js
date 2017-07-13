const Util = require("../util.js");
const assert = require('assert');

describe("#discordbot", function() {
    describe("#fizzbuzz", function() {
        it("should return a fizz buzz sequence", function(done) {
            let fbstr = Util.getFizzBuzzString({
                number: 15,
                fizz: "Fizz",
                buzz: "Buzz"
            })
            assert.equal(fbstr, "1 | 2 | Fizz | 4 | Buzz | Fizz | 7 | 8 | Fizz | Buzz | 11 | Fizz | 13 | 14 | FizzBuzz | ");
            done();
        });
    })

    describe("#gettoone", function() {
        it("getting to one from a number should return a series of steps", function(done) {
            let fbstr = Util.getGetToOneString({
                number: 15
            })
            assert.equal(fbstr, "15, 5, 6, 2, 3, 1");
            done();
        });
    })

    let client = {}
    client.persons = []
    describe("#makeperson", function() {
        it("should be able to insert a new person into a some object (a client)", function(done) {
            Util.makePersonFunc(client, {
                name: "John",
                age: 30,
                occu: "Developer"
            })

            assert.equal(client.persons.length, 1);
            done();
        });
    })

    describe("#outputperson", function() {
        it("should be able to output an inserted persons info", function(done) {
            let fbstr = Util.findPersonFunc(client, {
                name: "John"
            })

            assert.equal(fbstr, "Name: " + "John" + " Age: " + 30 + " Occupation: " + "Developer");
            done();
        });
    })

    describe("#pokemondamagetypes", function() {
        it("normal attack versus steel rock pokemon", function(done) {
            let fbstr = Util.pokemonDmgTypesFunc({
                atktype: "normal",
                dmgtype: "steel",
                dmgtype2: "rock"
            })

            assert.equal(fbstr, 0.25);
            done();
        });

        it("electric attack versus grass fire pokemon", function(done) {
            let fbstr = Util.pokemonDmgTypesFunc({
                atktype: "electric",
                dmgtype: "grass",
                dmgtype2: "fire"
            })

            assert.equal(fbstr, 0.5);
            done();
        });
    })

    describe("#square", function() {
        it("squaring 10 should return 100", function(done) {
            let fbstr = Util.squareFunc({
                number: 10
            })

            assert.equal(fbstr, 100);
            done();
        });
    })
})
