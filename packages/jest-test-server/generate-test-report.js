const fs = require("fs");
const getReportResults = require("./services/getReportResults");
const suitesInput = require("./__fixtures__/suitesInput.json");

(async () => {
  const { suitesReportTerminal, suitesReportJson } = await getReportResults(
    suitesInput
  );

  fs.writeFileSync(
    `./__fixtures__/suitesOutput.json`,
    JSON.stringify({ suitesReportTerminal, suitesReportJson }, null, 2)
  );
})();
