/**
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
 */

/**
 * DISCLAIMER:
 * I am not responsible in any way of any consequence of the usage
 * of this piece of software. You are warned, use it at your own risks.
 */

const Joi = require("joi");

class SmartObject {
  constructor(schema) {
    // Checking if the schema is an actual hapi/joi schema
    if (!Joi.isSchema(schema)) {
      throw new TypeError(`schema must be a valid Joi schema`);
    }
    // -------

    // Hiding and initializing private schema and content
    Object.defineProperty(this, "_schema", {
      enumerable: false,
      writable: true,
    });
    Object.defineProperty(this, "_content", {
      enumerable: false,
      writable: true,
    });
    this._schema = schema;
    this._content = {};
    // -------

    return new Proxy(this, {
      set: (obj, prop, value) => {
        const oldValue = Reflect.get(obj._content, prop); // Saving the old value
        const result = Reflect.set(obj._content, prop, value); // Setting the new value

        try {
          Joi.assert(obj._content, obj._schema); // Validating the content
        } catch (error) {
          // Rollbacking the value on validation error
          Reflect.set(obj._content, prop, oldValue);
          if (!Reflect.get(obj._content, prop)) {
            Reflect.deleteProperty(obj._content, prop);
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
      },
    });
  }
}

module.exports = SmartObject;
