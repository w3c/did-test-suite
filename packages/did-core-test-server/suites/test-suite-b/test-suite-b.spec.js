let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require("./defaultSuiteConfig.json");
}
describe("test-suite-b", () => {
  it("suite config should have correct name", async () => {
    expect(suiteConfig.name).toBe("test-suite-b");
  });

  it("x should be 3", async () => {
    expect(suiteConfig.x).toBe(3);
  });

  it("y should be 4", async () => {
    expect(suiteConfig.y).toBe(4);
  });
});
