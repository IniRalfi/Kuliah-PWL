import { describe, it, expect } from "bun:test";
import { sayHello } from "../hello";

describe("Testing ini aku mau ngetes modul Hello", () => {
  it("Should return hello in string", () => {
    expect(sayHello("Rafli")).toBe("Hello Rafli");
  });
  it("Should return hello in string", () => {
    expect(sayHello("Rafli")).toBe("Hello Rafli");
  });
});
