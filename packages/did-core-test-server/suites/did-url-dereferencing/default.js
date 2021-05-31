module.exports = {
  "name": "DID URL Dereferencing",
  "dereferencers": [
    require('../implementations/dereferencer-3-3box-labs.json')

    // commented out breaking fixtures
    // require('../implementations/dereferencer-example-didwg.json'),
  ]
}
