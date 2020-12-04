
const {
  generateScenarioResults
} = require('../../utils');

const getMethod = id => id.split(':')[1];

// WIP for other assertions
// function getUser(){
//   return {
//     primary: "did:example:000",
//     equivalents: {}
//   }
// }

// function evalCanonical(id, canonicalId){
//   let user = getUser(id);
//   if (user.primary !== canonicalId) {
//     user.equivalents[user.primary] = true;
//     user.primary = canonicalId;
//   }
//   return user;
// }

// function evalEquivalents(id, equivalentId){
//   let user = getUser(id);
//   equivalentId.forEach(id => user.equivalents[id] = true);
//   return user;
// }

const assertions = {
  [`canonicalId and equivalentId must be of the same DID Method as the resolved ID`]: (scenario) => {
    let doc = scenario.output['did-document'];
    let meta = scenario.output['did-document-metadata'];
    let method = getMethod(doc.id);
    return getMethod(meta.canonicalId) === method && meta.equivalentId.every(id => getMethod(id) === method);
  },
  [`When canonicalId is present, it must be recognized as the primary ID reference, 
    and if the resolved ID differs from canonicalId, it must be recognized as an 
    equivalent reference`]: (scenario) => {
      return false;
      // console.log(scenario);
      // let doc = scenario.output['did-document'];
      // let canonicalId = scenario.output['did-document-metadata'].canonicalId;
      // if (canonicalId) {
      //   let user = evalCanonical(doc.id, canonicalId);
      //   return user.primary === canonicalId;
      // }
      // else return true;
  },
  [`When equivalentId is present, its values must be recognized as equivalent ID references, 
    and the resolved ID must be recognized as the primary reference, 
    absent a specified canonicalId`]: (scenario) => {
      return false;
      // console.log(scenario);
      // let doc = scenario.output['did-document'];
      // let equivalentId = scenario.output['did-document-metadata'].equivalentId;
      // if (equivalentId) {
      //   let user = evalEquivalents(doc.id, equivalentId);
      //   return equivalentId.every(id => id in user.equivalents);
      // }
      // else return true;
  }
};
module.exports = generateScenarioResults(assertions);
