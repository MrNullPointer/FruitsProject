const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose.connect("mongodb://localhost:27017/fruitsDB"); //<- Name of the database that we want to connect to

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

//use schema to create a Fruit model, mongo will drop the capital F using loDash
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
  // fruit document creation from model
  name: "Apple",
  rating: 2,
  review: "Pretty solid as a fruit.",
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "Parikshit",
  age: 28,
});

// //<-------- Add bulk of fruits ------->//
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 9,
//   review: "The best fruit",
// });

// const orange = new Fruit({
//   name: "Orange",
//   rating: 6,
//   review: "I like them sometimes",
// });

// const banana = new Fruit({
//   name: "Banana",
//   rating: 9,
//   review: "I love bananas",
// });

/*
Save The above declared fruits in a bulk by using insertMany
Available in Mongoose API/model
*/

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Sucessfully saved all the fruits in fruitsDB");
//   }
// });

// fruit.save();
// person.save();

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close(); //close the connection when done
    fruits.forEach((element) => console.log(element.name));
  }
});
