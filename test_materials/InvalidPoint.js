const JoiSmartObject = require("../JoiSmartObject");

class InvalidPoint extends JoiSmartObject {
  static getSchema() {
    return null;
  }

  constructor() {
    super(InvalidPoint.getSchema());
  }
}

module.exports = InvalidPoint;
