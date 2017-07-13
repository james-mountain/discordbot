const Util = require("../util.js");
const assert = require("assert");

describe("#discordbot", function() {
    describe("#fizzbuzz", function() {
        it("should return a fizz buzz sequence", function(done) {
            let fbstr = Util.getFizzBuzzString({
                number: 15,
                fizz: "Fizz",
                buzz: "Buzz"
            });
            assert.equal(fbstr, "1 | 2 | Fizz | 4 | Buzz | Fizz | 7 | 8 | Fizz | Buzz | 11 | Fizz | 13 | 14 | FizzBuzz | ");
            done();
        });
    });

    describe("#gettoone", function() {
        it("getting to one from 15 should return a series of steps", function(done) {
            let fbstr = Util.getGetToOneString({
                number: 15
            });
            assert.equal(fbstr, "15, 5, 6, 2, 3, 1");
            done();
        });

        it("getting to one from 253 should return a series of steps", function(done) {
            let fbstr = Util.getGetToOneString({
                number: 253
            });
            assert.equal(fbstr, "253, 252, 84, 28, 27, 9, 3, 1");
            done();
        });
    });

    let client = {};
    client.persons = [];
    describe("#makeperson", function() {
        it("should be able to insert a new person into a some object (a client)", function(done) {
            Util.makePersonFunc(client, {
                name: "John",
                age: 30,
                occu: "Developer"
            });

            assert.equal(client.persons.length, 1);
            done();
        });
    });

    describe("#outputperson", function() {
        it("should be able to output an inserted persons info", function(done) {
            let fbstr = Util.findPersonFunc(client, {
                name: "John"
            });

            assert.equal(fbstr, "Name: " + "John" + " Age: " + 30 + " Occupation: " + "Developer");
            done();
        });

        it("should be able to display an error if no person is found", function(done) {
            let fbstr = Util.findPersonFunc(client, {
                name: "Test"
            });

            assert.equal(fbstr, "Could not find: " + "Test");
            done();
        });
    });

    describe("#pokemondamagetypes", function() {
        it("normal attack versus steel rock pokemon", function(done) {
            let fbstr = Util.pokemonDmgTypesFunc({
                atktype: "normal",
                dmgtype: "steel",
                dmgtype2: "rock"
            });

            assert.equal(fbstr, 0.25);
            done();
        });

        it("electric attack versus grass fire pokemon", function(done) {
            let fbstr = Util.pokemonDmgTypesFunc({
                atktype: "electric",
                dmgtype: "grass",
                dmgtype2: "fire"
            });

            assert.equal(fbstr, 0.5);
            done();
        });
    });

    describe("#square", function() {
        it("squaring 10 should return 100", function(done) {
            let fbstr = Util.squareFunc({
                number: 10
            });

            assert.equal(fbstr, 100);
            done();
        });
    });

    describe("#coinmarketcapapi", function() {
        it("asking about bitcoin should return data", function(done) {
            let req = Util.coinMarketCapPrice({
                currency: "bitcoin"
            }, function() {
                let data = JSON.parse(req.responseText);

                assert.equal(data[0].name, "Bitcoin")
                done();
            });
        });
    });

    describe("#weatherapi", function() {
        it("asking about the weather in Manchester should return data", function(done) {
            let req = Util.weatherFunc({
                city: "manchester"
            }, function() {
                let data = JSON.parse(req.responseText);

                assert.ok(data.weather[0].description)
                done();
            });
        });
    });
})
