const Joi = require("joi");
const JoiSmartObject = require("../JoiSmartObject");

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
