module.exports = {
  "name": "DID URL Dereferencing",
  "dereferencers": [
    require('../implementations/dereferencer-example-didwg.json'),
    require('../implementations/dereferencer-3-3box-labs.json'),
    require('../implementations/dereferencer-nft-3box-labs.json')
  ]
}
