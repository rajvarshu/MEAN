const mongoose = require("mongoose");
const personsSchema = new mongoose.Schema({
  index: {
    type: "Number",
  },
  name: {
    type: "String",
  },
  isActive: {
    type: "Boolean",
  },
  registered: {
    type: "Date",
  },
  age: {
    type: "Number",
  },
  gender: {
    type: "String",
  },
  eyeColor: {
    type: "String",
  },
  favoriteFruit: {
    type: "String",
  },
  company: {
    title: {
      type: "String",
    },
    email: {
      type: "String",
    },
    phone: {
      type: "String",
    },
    location: {
      country: {
        type: "String",
      },
      address: {
        type: "String",
      },
    },
  },
  tags: {
    type: ["String"],
  },
});
const Person = mongoose.model("Person", personsSchema, "persons");

module.exports = Person;
