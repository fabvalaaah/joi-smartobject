# joi-smartobject

joi-smartobject is an NPM module that features an ES6 superclass called JoiSmartObject. This superclass forces the validation of a constructor given hapi/joi schema when properties of its subclass are added, updated or deleted. At runtime, if a property of an object that inherits from JoiSmartObject is added, deleted or set with a wrong typed value, a hapi/joi ValidationError is automatically thrown (and should be caught).

## Package installation

Run `npm i joi-smartobject` to install the package.

## Require & usage

Require the package with:

```javascript
const SmartObject = require("joi-smartobject");
```

Then make your subclass extends SmartObject as follow:

```javascript
class SubClass extends SmartObject {
  constructor(...) {
    super(...); // With the valid hapi/joi schema of the SubClass as parameter
    ...
  }
}
```

Now, properties of SubClass instances will be checked each time they change.

## Example

Point is an object that stores 2D coordinates (x, y) as positive or null integers. It also has a dumb function called "foo(...)" and an overriden "toString()":

```javascript
const Joi = require("@hapi/joi");
const SmartObject = require("joi-smartobject");

class Point extends SmartObject {
  static getSchema() {
    return Joi.object({
      x: Joi.number()
        .integer()
        .min(0), // int x (>=0)
      y: Joi.number()
        .integer()
        .min(0) // int y (>=0)
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

## Tests

Run `npm test` from the local module directory to execute the embedded "tests" (located in the "test" folder). I assume these tests are not actual serious tests. Consider them as a sample of common use-cases.

## DONATION

As I share these sources for commercial use too, maybe you could consider sending me a reward (even a tiny one) to my **Ethereum** wallet at the address **0x1fEaa1E88203cc13ffE9BAe434385350bBf10868** If so, I would be forever grateful to you and motivated to keep up the good work for sure :oD

**Thanks in advance!**

## FEEDBACK

You like my work? It helps you? You plan to use/reuse/transform it? You have suggestions or questions about it? Just want to say "hi"? Let me know your feedbacks by mail to the address fabvalaaah@laposte.net

## DISCLAIMER

I am not responsible in any way of any consequence of the usage of this piece of software. You are warned, use it at your own risks.
