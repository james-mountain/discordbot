const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
const typenames = [
    "normal",
    "steel",
    "rock",
    "fire",
    "fairy",
    "bug",
    "dragon",
    "electric",
    "dark",
    "fighting",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "poison",
    "psychic",
    "water"
];
let typemultipliers = [];

function doAPICall(url, callback) {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "json";
    request.send();

    request.onload = callback;

    return request;
}

function loadTypesFromFile() {
    for (let i = 0; i < typenames.length; i++) {
        var url = "./typedata/" + typenames[i] + ".json";

        let data = JSON.parse(fs.readFileSync(url, "utf8"));

        var currepdmgrels = data.damage_relations;
        typemultipliers[i] = Array(typenames.length).fill(1);

        currepdmgrels.half_damage_to.forEach(function(typ) {
            typemultipliers[i][typenames.findIndex((v) => v === typ.name)] = 0.5;
        });

        currepdmgrels.no_damage_to.forEach(function(typ) {
            typemultipliers[i][typenames.findIndex((v) => v === typ.name)] = 0;
        });

        currepdmgrels.double_damage_to.forEach(function(typ) {
            typemultipliers[i][typenames.findIndex((v) => v === typ.name)] = 2;
        });
    }
}

function procinput(input) {
    if (input % 3 === 0) {
        return input / 3;
    } else if (input % 3 === 1) {
        return input - 1;
    } else if (input % 3 === 2) {
        return input + 1;
    }
}
loadTypesFromFile();

module.exports = {
    getFizzBuzzString(args) {
        if (typeof args.number !== "number" || typeof args.fizz !== "string" || typeof args.buzz !== "string") {
            return "Invalid arguments.";
        }

        let buildString = "";
        for (let i = 1; i <= args.number; i++) {
            if (i % 3 === 0) {
                buildString += args.fizz;
            }
            if (i % 5 === 0) {
                buildString += args.buzz;
            }
            if (i % 3 !== 0 && i % 5 !== 0) {
                buildString += i;
            }

            buildString += " | ";
        }
        return buildString;
    },

    getGetToOneString(args) {
        if (typeof args.number !== "number") {
            return "Invalid arguments.";
        }

        let input = args.number;
        let buildString = input + ", ";
        while (input !== 1) {
            input = procinput(input);
            buildString += input;
            if (input !== 1) {
                buildString += ", ";
            }
        }

        return buildString;
    },

    makePersonFunc(client, args) {
        if (typeof args.name !== "string" || typeof args.age !== "number" || typeof args.occu !== "string") {
            return false;
        }

        let person = {};

        person.name = args.name;
        person.age = args.age;
        person.occupation = args.occu;

        client.persons[client.persons.length] = person;

        return true;
    },

    findPersonFunc(client, args) {
        let foundperson = client.persons.find((x) => x.name === args.name);

        if (foundperson) {
            return "Name: " + foundperson.name + " Age: " + foundperson.age + " Occupation: " + foundperson.occupation;
        } else {
            return "Could not find: " + args.name;
        }
    },

    pokemonDmgTypesFunc(args) {
        function getMultiAttackDmgIndex(atktype, deftype) {
            let atkindex = typenames.findIndex((v) => v === atktype);
            let defindex = typenames.findIndex((v) => v === deftype);

            if (atkindex > -1 && defindex > -1) {
                return typemultipliers[atkindex][defindex];
            } else {
                return false;
            }
        }

        let multi = getMultiAttackDmgIndex(args.atktype, args.dmgtype);
        if (!multi) {
            return false;
        }

        if (args.dmgtype2 !== "none") {
            let smulti = getMultiAttackDmgIndex(args.atktype, args.dmgtype2);
            if (!smulti) {
                return false;
            }
            multi *= smulti;
        }

        return multi;
    },

    squareFunc(args) {
        if (typeof args.number !== "number") {
            return "Invalid arguments.";
        }

        return args.number * args.number;
    },

    coinMarketCapPrice(args, callback) {
        return doAPICall("https://api.coinmarketcap.com/v1/ticker/" + args.currency + "/", callback);
    },

    weatherFunc(args, callback) {
        return doAPICall("http://api.openweathermap.org/data/2.5/weather?q=" + args.city + "&appid=61e12b8fafc32ee19c827da95371aca8", callback);
    },

    rollTheDiceFunc() {
        return Math.floor((Math.random() * 6) + 1);
    }
};
