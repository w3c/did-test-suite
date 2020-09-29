const assertions = {
/*  "DID must not be empty": (scenario) => {
    if (scenario.input.did) return true; else return false;
  },*/
  "Negative test: DID must be a valid URL": (scenario) => {

    var tested = false;
    var correct = true;

    for (i in scenario.tests) {
      let test = scenario.tests[i];

      var url;
      try { url = new URL(test.did); } catch (error) { url = null; };
      let valid = (url !== null);

      if (! valid) { tested = true; correct = correct && (! test.valid); }
    }

    return tested ? correct : null;
  },
  "Negative test: The URI scheme MUST be 'did:'": (scenario) => {

    var tested = false;
    var correct = true;

    for (i in scenario.tests) {
      let test = scenario.tests[i];

      var url;
      try { url = new URL(test.did); } catch (error) { continue; };
      let valid = (url.protocol === 'did:');

      if (! valid) { tested = true; correct = correct && (! test.valid); }
    }

    return tested ? correct : null;
  },
  "Negative test: The DID method name MUST be an ASCII lowercase string": (scenario) => {

    var tested = false;
    var correct = true;

    for (i in scenario.tests) {
      let test = scenario.tests[i];

      var url;
      try { url = new URL(test.did); } catch (error) { continue; };
      let method_name = url.pathname.substring(0, url.pathname.indexOf(':'));
      let valid = (method_name.toLowerCase() === method_name);

      if (! valid) { tested = true; correct = correct && (! test.valid); }
    }

    return tested ? correct : null;
  },
};

const testDidSyntax = (scenario) => {
  let assertion_results = {};

  Object.keys(assertions).forEach((assertion) => {
    assertion_results = {
      ...assertion_results,
      [assertion]: assertions[assertion](scenario),
    };
  });

  const test_result = Object.values(assertion_results).every((result) => {
    return result === true;
  });

  return {
    scenario: scenario.name,
    test: test_result ? "PASS" : "FAIL",
    assertion_results,
  };
};

module.exports = testDidSyntax;
