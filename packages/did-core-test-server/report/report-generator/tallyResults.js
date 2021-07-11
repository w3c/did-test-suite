const title_clip = (v) => {
    let r = v.replace(/^(.{0,64}).*$/, "$1");
    return r != v ?  `${r}\u{2026}` : r;
};

module.exports = tallyResults = (results) => {
    let bySuite = {}, byMethod = {};
    let summaryByMethod = {}, summaryByTitle = {};
    let method2id = {}, title2id = {};

    results.forEach((r) => {
        r.testResults.forEach((tr) => {
            let title = tr.title;
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
                parameters: parameters,
                title: tr.title,
                title_clip: title_clip(tr.title)
            };

            title2id[title] = 0;
            method2id[did_method] = 0;

            bySuite[suite_name] = bySuite[suite_name] || {};
            bySuite[suite_name][title] = bySuite[suite_name][title] || [];
            bySuite[suite_name][title].push(didMethodTestResult);

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

            summaryByTitle[title] = summaryByTitle[title] || {};
            summaryByTitle[title][did_method] = summaryByTitle[title][did_method] || {};
            summaryByTitle[title][did_method][tr.status] =
                summaryByTitle[title][did_method][tr.status] || [];
            summaryByTitle[title][did_method][tr.status].push(implementation);
        });
    });

    // Assign ID in sorted order
    Object.keys(title2id).sort().forEach( (k, i) => title2id[k] = `T${1 + i}` ); 
    Object.keys(method2id).sort().forEach( (k, i) => method2id[k] = `M${1 + i}` ); 
    method2id['did:unspecified'] = method2id['unspecified'];

    return {
        suiteNames: Object.keys(bySuite),
        bySuite: bySuite,
        byMethod: byMethod,
        summaryByMethod: summaryByMethod,
        summaryByTitle: summaryByTitle,
        title2id: title2id,
        method2id: method2id
    };
};