const Joi = require("@hapi/joi");
const Point = require("../test_materials/Point");
const InvalidPoint = require("../test_materials/InvalidPoint");

const phrase = "lorem ipsum";
const int1 = 42;
const int2 = 43;
const int3 = -42;
let instance = null; // Common Point instance

describe("JoiSmartObject", () => {
  test("invalid hapi/joi schema", () => {
    instance = null;

    try {
      instance = new InvalidPoint();
      fail("should not be here");
    } catch (err) {
      expect(instance).toBeNull();
      expect(err).toBeInstanceOf(TypeError);
    }
  });

  test("invalid init values", () => {
    instance = null;

    try {
      instance = new Point(int1, int3);
      fail("should not be here");
    } catch (err) {
      expect(instance).toBeNull();
      expect(err).toBeInstanceOf(Joi.ValidationError);
    }
  });

  test("valid init values", () => {
    instance = new Point(int1, int2);

    expect(instance).not.toBeNull();
    expect(instance.x).toStrictEqual(int1);
    expect(instance.y).toStrictEqual(int2);
    expect(instance.toString()).toStrictEqual(`(${int1}, ${int2})`);
    expect(instance.foo(phrase)).toStrictEqual(phrase);
  });

  test("Point type check", () => {
    expect(instance).not.toBeNull();
    expect(instance).toBeInstanceOf(Point);
  });

  test("wrong property type", () => {
    expect(instance).not.toBeNull();
    const tempX = instance.x;

    try {
      instance.x = phrase;
      fail("should not be here");
    } catch (err) {
      expect(instance.x).toStrictEqual(tempX);
      expect(err).toBeInstanceOf(Joi.ValidationError);
    }
  });

  test("undefined property", () => {
    expect(instance).not.toBeNull();

    try {
      instance.z = phrase;
      fail("should not be here");
    } catch (err) {
      expect(instance.z).toBeUndefined();
      expect(err).toBeInstanceOf(Joi.ValidationError);
    }
  });
});
