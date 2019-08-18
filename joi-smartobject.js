/*
 * MIT License
 *
 * Copyright (c) 2019 Fabvalaaah - fabvalaaah@laposte.net
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * DONATION:
 * As I share these sources for commercial use too, maybe you could consider
 * sending me a reward (even a tiny one) to my Ethereum wallet at the address
 * 0x1fEaa1E88203cc13ffE9BAe434385350bBf10868
 * If so, I would be forever grateful to you and motivated to keep up the good
 * work for sure :oD Thanks in advance !
 *
 * FEEDBACK:
 * You like my work? It helps you? You plan to use/reuse/transform it? You have
 * suggestions or questions about it? Just want to say "hi"? Let me know your
 * feedbacks by mail to the address fabvalaaah@laposte.net
 *
 * DISCLAIMER:
 * I am not responsible in any way of any consequence of the usage
 * of this piece of software. You are warned, use it at your own risks.
 */

const Joi = require("@hapi/joi");

class SmartObject {
  constructor(schema) {
    // Checking if the schema looks like a valid Joi schema
    if (
      !schema ||
      typeof schema !== typeof Joi.object() ||
      !schema.isJoi ||
      schema.schemaType !== "object"
    ) {
      throw new TypeError(`schema must be a valid Joi schema`);
    }
    // -------

    // Hiding and initializing private schema and content
    Object.defineProperty(this, "_schema", {
      enumerable: false,
      writable: true
    });
    Object.defineProperty(this, "_content", {
      enumerable: false,
      writable: true
    });
    this._schema = schema;
    this._content = {};
    // -------

    return new Proxy(this, {
      set: (obj, prop, value) => {
        const oldValue = Reflect.get(obj._content, prop); // Saving the old value
        const result = Reflect.set(obj._content, prop, value); // Setting to the new value

        try {
          Joi.assert(obj._content, obj._schema); // Validating the content
        } catch (error) {
          // Rollbacking the value on validation error
          Reflect.set(obj._content, prop, oldValue);
          if (!Reflect.get(obj._content, prop)) {
            delete obj._content[prop];
          }
          throw error; // Forwarding the error
          // -------
        }

        return result;
      },
      get: (target, prop) => {
        const property = Reflect.get(target, prop);
        return typeof property === "function"
          ? property.bind(target._content)
          : Reflect.get(target._content, prop);
      }
    });
  }
}

module.exports = SmartObject;
