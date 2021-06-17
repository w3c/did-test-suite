const brokenFixtures = process.env.DID_WG_INCLUDE_BREAKING ? [
  require('../implementations/dereferencer-example-didwg.json'),
] : []

module.exports = {
  "name": "DID URL Dereferencing",
  "dereferencers": [
    require('../implementations/dereferencer-3-3box-labs.json'),
    require('../implementations/dereferencer-nft-3box-labs.json'),
    require('../implementations/dereferencer-web-transmute.json'),
    require('../implementations/universal-resolver-dereferencer-tests.json'),
    ...brokenFixtures
    
  ]
}
