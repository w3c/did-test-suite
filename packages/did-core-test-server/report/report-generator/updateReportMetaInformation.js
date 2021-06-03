const moment = require('moment');

module.exports = updateReportMetaInformation = ($, systemSuitesConfig) => {
    $('#did-spec-suite-configuration').replaceWith(
      `<pre
          id="did-spec-suite-configuration"
          class="example"
          title="The current did-spec configuration file"
        >
  ${JSON.stringify(systemSuitesConfig, null, 2)}
        </pre>`
    );
  
    $('#did-spec-report-date').replaceWith(
      `<p id="did-spec-report-date" class="note">
  These test results were last generated 
  <span>
  ${moment().format('LLLL')}
  </span>
        </p>`
    );
  
};