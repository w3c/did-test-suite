const runSuite = require("./runSuite");

const sanitizeAllResults = require("./sanitizeAllResults");

async function capture(fn, p) {
  const originalWrite = p.write;
  let output = "";
  try {
    p.write = (chunk) => {
      if (typeof chunk === "string") {
        output += chunk;
      }
      return true;
    };
    await fn();
  } catch (e) {
    throw e;
  } finally {
    p.write = originalWrite;
  }
  return output;
}

module.exports = getReportResults = async (suites) => {
  let allResults = [];
  const runAll = async () => {
    await Promise.all(
      suites.suites.map(async (s) => {
        const results = await runSuite(s.suite_name, s);
        allResults.push(results);
      })
    );
  };
  const capturedReport = await capture(runAll, process.stderr);
  return {
    suitesReportTerminal: Buffer.from(capturedReport).toString("base64"),
    suitesReportJson: sanitizeAllResults(allResults),
  };
};
