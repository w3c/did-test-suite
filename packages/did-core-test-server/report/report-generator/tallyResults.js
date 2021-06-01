module.exports = tallyResults = (results) => {
    let bySuite = {};
    let byMethod = {};
    let summaryByMethod = {};
    let summaryByTitle = {};

    results.forEach((r) => {
        r.testResults.forEach((tr) => {
            let ancestors = [...tr.ancestors];
            let suite_name = ancestors.shift().match(/^suites\/(.*)$/)[1];
            let did = ancestors.find(a => a.match(/^did:/)) || "did:UNKNOWN";
            let tuple = ancestors.shift().match(/^IMPLEMENTATION ::(.*)::(.*)::(.*)::$/);
            if (tuple.length == 4) {
                tuple.shift();
            }
            else {
                tuple = ["undefined", "undefined", "undefined"];
            }
            let [did_method, implementation, implementer] = tuple;
            did_method = (did_method == "undefined" || !did_method) ? "unspecified" : did_method;

            if (!implementation.match(/example/i)) {
                let parameters = [did,
                    ...(ancestors.filter(a => a.match(/^PARAMETER (.*)/)) || []).map(a => a.replace(/PARAMETER /, '')),
                    ...(ancestors.filter(a => a.match(/^application\//)) || [])];
                let didMethodTestResult = {
                    status: tr.status,
                    did_method: did_method,
                    implementation: implementation,
                    implementer: implementer,
                    suite_name: suite_name,
                    did: did,
                    parameters: parameters
                };

                bySuite[suite_name] = bySuite[suite_name] || {};
                bySuite[suite_name][tr.title] = bySuite[suite_name][tr.title] || [];
                bySuite[suite_name][tr.title].push(didMethodTestResult);

                let implementation_key = `Implementation: ${implementation}`;
                byMethod[did_method] = byMethod[did_method] || {};
                byMethod[did_method][implementation_key] = byMethod[did_method][implementation_key] || [];
                byMethod[did_method][implementation_key].push(didMethodTestResult);

                summaryByMethod[did_method] = summaryByMethod[did_method] || {};
                summaryByMethod[did_method][implementation] = summaryByMethod[did_method][implementation] || {};
                summaryByMethod[did_method][implementation][suite_name] =
                    summaryByMethod[did_method][implementation][suite_name] || {};
                summaryByMethod[did_method][implementation][suite_name][tr.status] =
                    summaryByMethod[did_method][implementation][suite_name][tr.status] + 1 || 1;

                summaryByTitle[tr.title] = summaryByTitle[tr.title] || {};
                summaryByTitle[tr.title][did_method] = summaryByTitle[tr.title][did_method] || {};
                summaryByTitle[tr.title][did_method][tr.status] =
                    summaryByTitle[tr.title][did_method][tr.status] || [];
                summaryByTitle[tr.title][did_method][tr.status].push(implementation);
            }
        });
    });

    return {
        suiteNames: Object.keys(bySuite),
        bySuite: bySuite,
        byMethod: byMethod,
        summaryByMethod: summaryByMethod,
        summaryByTitle: summaryByTitle
    };
};