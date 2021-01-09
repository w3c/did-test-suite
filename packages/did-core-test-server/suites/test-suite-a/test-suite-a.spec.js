let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require("./defaultSuiteConfig.json");
}

describe("test-suite-a", () => {
  it("suite config should have correct name", async () => {
    expect(suiteConfig.name).toBe("test-suite-a");
  });

  it("a should be 1", async () => {
    expect(suiteConfig.a).toBe(1);
  });

  it("b should be 2", async () => {
    expect(suiteConfig.b).toBe(2);
  });
});
