const Rocket = require("./rocket");

describe("Rocket", () => {
  describe("constructor", () => {
    test("it should set default attributes if nothing is passed", () => {
      const rocket = new Rocket();

      expect(rocket.name).toBeTruthy();
      expect(rocket.colour).toBeTruthy();
      expect(rocket.flying).toEqual(false);
    });

    test("it should set the rocket's name, colour, flying status if provided", () => {
      const rocket = new Rocket({
        name: "FirstRocket",
        colour: "blue",
        flying: true
      });

      expect(rocket.name).toEqual("FirstRocket");
      expect(rocket.colour).toEqual("blue");
      expect(rocket.flying).toEqual(true);
    });
  });

  describe("liftOff", () => {
    test("it sets flying to true when initialized with default values", () => {
      const rocket = new Rocket();

      // flying = false. call liftOff
      rocket.liftOff();
      expect(rocket.flying).toEqual(true);

      // try to call it again
      expect(rocket.flying).toEqual(true);
    });

    test("it returns false if the rocket is already flying", () => {
      const rocket = new Rocket({flying: true});
      expect(rocket.liftOff()).toBe(false);
      expect(rocket.flying).toEqual(true);
    });
  });

  describe("land", () => {
    test("it sets flying to false when initialized with default values", () => {
      const rocket = new Rocket();

      // flying = false. call land
      rocket.land();
      expect(rocket.land()).toBe(false);
      expect(rocket.flying).toEqual(false);
    });

    test("it returns false if the rocket is already flying", () => {
      const rocket = new Rocket({flying: true});
      expect(rocket.land()).toBe(true);
      expect(rocket.flying).toEqual(false);
    });
  });

  describe("status", () => {
    test(`it returns Rocket ${this.name} is flying through the sky!`, () => {
      const rocket = new Rocket({
        name: "FirstRocket",
        colour: "blue",
        flying: true
      });

      expect(rocket.status()).toEqual(
        `Rocket ${rocket.name} is flying through the sky!`
      );
    });

    test(`it returns Rocket ${this.name} is ready for liftoff!`, () => {
      const rocket = new Rocket();

      expect(rocket.status()).toEqual(
        `Rocket ${rocket.name} is ready for liftoff!`
      );
    });
  });

  describe("sendCodedSignal", () => {
    test("it sends 'boop' when nothing is passed in", () => {
      const rocket = new Rocket();

      // call the method on our default instance
      expect(rocket.sendCodedSignal()).toEqual("boop");
    });

    test("it sends 'beep' when a messageCode < 10", () => {
      const rocket = new Rocket();
      expect(rocket.sendCodedSignal(9)).toEqual("beep");
      expect(rocket.sendCodedSignal(Math.floor(Math.random() * 10))).toEqual(
        "beep"
      );

      expect(rocket.sendCodedSignal(19)).not.toBe("beep");
    });

    test("it sends 'beep' when a messageCode < 10 AND flying = true", () => {
      const flyingRocket = new Rocket({flying: true});

      expect(flyingRocket.sendCodedSignal(9)).toBe("beep beep");
    });

    test("it sends 'boop boop boop' when flying", () => {
      const rocket = new Rocket();
      rocket.liftOff();

      expect(rocket.sendCodedSignal(10)).toBe("boop boop boop");

      rocket.land();
      expect(rocket.sendCodedSignal(10)).toBe("boop beep beep");
    });

    test("it sends 'boop beep beep' when sendCodedSignal >= 10 AND landed", () => {
      const landedRocket = new Rocket();

      expect(landedRocket.sendCodedSignal(10)).toBe("boop beep beep");
    });
  });
});
