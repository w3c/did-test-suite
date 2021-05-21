const jestRunner = require("jest");
const path = require("path");

module.exports = async (suiteName, config) => {
  let results = await jestRunner.runCLI(
    {
      // json: true,
      // ci: true,
      // silent: true,
      roots: [path.resolve(__dirname, `../suites/${suiteName}`)],
      globals: JSON.stringify({ systemSuiteConfig: config }),
    },
    [process.cwd()]
  );
  return results;
};
