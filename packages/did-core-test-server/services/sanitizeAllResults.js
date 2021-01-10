module.exports = sanitizeAllResults = (allResults) => {
  let clean = [];

  allResults.forEach((element) => {
    clean.push({
      suite: element.results.testResults[0].testResults[0].ancestorTitles[0],
      testResults: element.results.testResults[0].testResults.map((tr) => {
        return {
          ancestors: tr.ancestorTitles,
          title: tr.title,
          status: tr.status,
        };
      }),
    });
  });

  return clean.sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );
};
