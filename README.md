# SmartObject

SmartObject is an ES6 class to inherit. It forces the validation of a constructor given Joi schema when setting subclass properties. At runtime, if a property is unauthorized or has a wrong type, a ValidationError is thrown (and should be caught).

## How to use it in a project?

Just copy the file "SmartObject.js" into your project and require it in your classes like this:

```javascript
const SmartObject = require("SmartObject");
```

Then, just make your subclasses extends SmartObject as follow:

```javascript
class SubClass extends SmartObject {
  constructor(...) {
    super(...); // With the valid Joi schema of the SubClass as parameter
    ...
  }
```

## How to run the embedded example?

Just execute `npm i` and then `npm start` in a console opened in the root directory of this project. Related files are located in the "./test" directory.

## DONATION

As I share these sources for commercial use too, maybe you could consider
sending me a reward (even a tiny one) to my **Ethereum** wallet at the address
**0x1fEaa1E88203cc13ffE9BAe434385350bBf10868**
If so, I would be forever grateful to you and motivated to keep up the good work
for sure :oD **Thanks in advance!**

## FEEDBACK

You like my work? It helps you? You plan to use/reuse/transform it? You have
suggestions or questions about it? Just want to say "hi"? Let me know your
feedbacks by mail to the address fabvalaaah@laposte.net

## DISCLAIMER

I am not responsible in any way of any consequence of the usage of this piece of
software. You are warned, use it at your own risks.
