const Point = require("./Point");

// let errors = [];
let myPoint;

// Invalid init
try {
  myPoint = new Point(12, -42);
} catch (error) {
  // errors.push(error);
  console.log(`${error}`);
}
console.log(`${myPoint}`); // Instance has not been initialized
// -------

// Valid init and calls
myPoint = new Point(42, 43);
console.log(`${myPoint.foo("Toto was here!")}`);
console.log(`${myPoint}`);
// -------

// Invalid property set (wrong type)
try {
  myPoint.x = "azerty";
} catch (error) {
  // errors.push(error);
  console.log(`${error}`);
}
console.log(`${myPoint}`); // Property value has been rollbacked
// -------

// Attempt to add an unknown property (fails)
try {
  myPoint.z = "azerty";
} catch (error) {
  // errors.push(error);
  console.log(`${error}`);
}
// -------

// Is myPoint an actual Point instance? (yes)
if (myPoint instanceof Point) {
  console.log("I'm a Point instance");
}
// -------

// console.log("\nThrowed errors:");
// errors.forEach(error => {
//   console.log(`${error}\n`);
// });
