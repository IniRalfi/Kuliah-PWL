import { describe, it, expect } from "bun:test";
import * as os from "node:os";

describe("NODE JS API", () => {
  it("Should support OS", async () => {
    const arch = os.arch();
    expect(arch).toBe("x64");

    const type = os.type();
    expect(type).toBe("Linux");
  });
});
