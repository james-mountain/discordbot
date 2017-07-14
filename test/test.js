const Util = require("../util.js");
const assert = require("assert");

describe("#discordbot", function() {
    describe("#fizzbuzz", function() {
        it("should return a valid fizz buzz sequence if 15 Fizz Buzz arguments are used", function(done) {
            let fbstr = Util.getFizzBuzzString({
                number: 15,
                fizz: "Fizz",
                buzz: "Buzz"
            });
            assert.equal(fbstr, "1 | 2 | Fizz | 4 | Buzz | Fizz | 7 | 8 | Fizz | Buzz | 11 | Fizz | 13 | 14 | FizzBuzz | ");
            done();
        });

        it("it should return an error if invalid arguments are used", function(done) {
            let fbstr = Util.getFizzBuzzString({
                number: "not a number",
                fizz: "Fizz",
                buzz: "Buzz"
            });
            assert.equal(fbstr, "Invalid arguments.");
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

        it("it should return an error if invalid arguments are used", function(done) {
            let fbstr = Util.getGetToOneString({
                number: "not a number"
            });
            assert.equal(fbstr, "Invalid arguments.");
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

        it("should not be able to take invalid arguments", function(done) {
            let fbstr = Util.makePersonFunc(client, {
                name: 3452343,
                age: "not a number",
                occu: "Developer"
            });

            assert.ok(!fbstr);
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

        it("should still with an error operate even the arguments are of the wrong type", function(done) {
            let fbstr = Util.findPersonFunc(client, {
                name: 30
            });

            assert.equal(fbstr, "Could not find: " + 30);
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

        it("blah attack versus fire edsd pokemon", function(done) {
            let fbstr = Util.pokemonDmgTypesFunc({
                atktype: "blah",
                dmgtype: "fire",
                dmgtype2: "edsd"
            });

            assert.ok(!fbstr);
            done();
        });

        it("ghost attack versus water blah pokemon", function(done) {
            let fbstr = Util.pokemonDmgTypesFunc({
                atktype: "ghost",
                dmgtype: "water",
                dmgtype2: "blah"
            });

            assert.ok(!fbstr);
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

        it("squaring an invalid number should return invalid arguments message", function(done) {
            let fbstr = Util.squareFunc({
                number: "not a number"
            });

            assert.equal(fbstr, "Invalid arguments.");
            done();
        });
    });

    describe("#coinmarketcapapi", function() {
        it("asking about bitcoin should return data", function(done) {
            let req = Util.coinMarketCapPrice({
                currency: "bitcoin"
            }, function() {
                let data = JSON.parse(req.responseText);

                assert.equal(data[0].name, "Bitcoin");
                done();
            });
        }).timeout(4000);

        it("asking about an invalid coin should return data showing it does not exist", function(done) {
            let req = Util.coinMarketCapPrice({
                currency: "invalid"
            }, function() {
                let data = JSON.parse(req.responseText);

                assert.ok(data.error);
                done();
            });
        }).timeout(4000);
    });

    describe("#weatherapi", function() {
        it("asking about the weather in Manchester should return data", function(done) {
            let req = Util.weatherFunc({
                city: "manchester"
            }, function() {
                let data = JSON.parse(req.responseText);

                assert.ok(data.weather[0].description);
                done();
            });
        }).timeout(5000);

        it("asking about invalid city weather should return error data", function(done) {
            let req = Util.weatherFunc({
                city: "|||"
            }, function() {
                let data = JSON.parse(req.responseText);

                assert.equal(data.message, "city not found");
                done();
            });
        }).timeout(5000);
    });

    describe("#rollthedice", function() {
        it("rolling the dice should return a number between 1 and 6 (inclusive)", function(done) {
            let fbstr = Util.rollTheDiceFunc();

            assert.ok(fbstr >= 1);
            assert.ok(fbstr <= 6);
            done();
        });
    });
});
