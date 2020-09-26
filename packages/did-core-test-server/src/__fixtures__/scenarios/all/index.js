const scenarios = [
  require('../resolve'),
  require('../did-parameters').positive,
];
const request = { scenarios };
// uncomment to capture all request
// console.log('Request all');
// console.log(JSON.stringify(request, null, 2));
const response = require('./response.json');
module.exports = { request, response };
