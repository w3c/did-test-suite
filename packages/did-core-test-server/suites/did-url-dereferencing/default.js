const brokenFixtures = process.env.DID_WG_INCLUDE_BREAKING ? [
  require('../implementations/dereferencer-example-didwg.json'),
] : []

module.exports = {
  "name": "DID URL Dereferencing",
  "dereferencers": [
    require('../implementations/dereferencer-ethr-2021-consensys-mesh.json'),
    require('../implementations/dereferencer-3-3box-labs.json'),
    require('../implementations/dereferencer-nft-3box-labs.json'),
    require('../implementations/dereferencer-web-transmute.json'),
    require('../implementations/universal-resolver-dereferencer-tests.json'),
    require('../implementations/dereferencer-mattr.json'),
    require('../implementations/dereferencer-polygon-ayanworks.json'),
    require('../implementations/dereferencer-spruce-key.json'),
    require('../implementations/dereferencer-spruce-web.json'),
    require('../implementations/dereferencer-spruce-tz.json'),
    require('../implementations/dereferencer-spruce-onion.json'),
    require('../implementations/dereferencer-spruce-pkh.json'),
    require('../implementations/dereferencer-spruce-webkey.json'),
    require('../implementations/dereferencer-ssb.json'),
    require('../implementations/dereferencer-cheqd.json'),
    require('../implementations/dereferencer-art.json'),
    require('../implementations/dereferencer-rm.json'),
    ...brokenFixtures
  ]
}
