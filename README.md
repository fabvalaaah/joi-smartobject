# joi-smartobject

NPM package that provides a wrapper which associates an hapi/joi schema to a class then automatically validates each change made on object properties at runtime.

## Installation

`npm i joi-smartobject`

## Usage

1. Class must extend JoiSmartObject.
2. First instruction of the constructor must be a call to `super` with the hapi/joi schema describing properties as parameter.

Then, when a property of an instance is added/updated/deleted, the hapi/joi schema is automatically validated to ensure that the modification is compliant with this schema. If not, the object is left intact and an hapi/joi `ValidationError` is thrown.

### Require

```javascript
const JoiSmartObject = require("joi-smartobject");
```

### Quick example

```javascript
class Foo extends JoiSmartObject { // JoiSmartObject inheritance
  constructor(...) {
    super(...); // With the hapi/joi schema describing the properties of a "Foo" object as parameter
    ...
  }
}
```

### Example

Point is an object that stores 2D coordinates (x, y) as positive or null integers. It also has a dumb function called "foo(...)" and an overriden "toString()":

```javascript
const Joi = require("@hapi/joi");
const JoiSmartObject = require("joi-smartobject");

class Point extends JoiSmartObject {
  static getSchema() {
    return Joi.object({
      x: Joi.number().integer().min(0), // int x (>=0)
      y: Joi.number().integer().min(0), // int y (>=0)
    });
  }

  constructor(x, y) {
    super(Point.getSchema()); // Mandatory

    this.x = x;
    this.y = y;
  }

  foo(message) {
    return message;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

module.exports = Point;
```

### Tests

`npm test`

## Disclaimer

I am not responsible in any way of any consequence of the usage of this piece of software. You are warned, use it at your own risks.
