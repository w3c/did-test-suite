
const brokenFixtures = process.env.DID_WG_INCLUDE_BREAKING ? [
  require('../implementations/did-unisot.json'),
] : []

module.exports = {
  name: 'did-consumption',
  didMethods: [
    require('../implementations/did-example-didwg.json'),
    require('../implementations/did-is.json'),
    require('../implementations/did-key-2018-db.json'),
    require('../implementations/did-key-2020-db.json'),
    require('../implementations/did-kilt-2021.json'),
    require('../implementations/did-3-2021-3box-labs.json'),
    require('../implementations/did-ethr-2021-consensys-mesh.json'),
    require('../implementations/did-trust.json'),
    require('../implementations/did-v1-vof.json'),
    require('../implementations/did-monid.json'),
    require('../implementations/did-vaa.json'),
    require('../implementations/did-ion.json'),
    require('../implementations/did-orb.json'),
    require('../implementations/did-lit.json'),
    require('../implementations/did-schema.json'),
    require('../implementations/did-nft-2021-3box-labs.json'),
    require('../implementations/did-key-transmute.json'),
    require('../implementations/did-web-transmute.json'),
    require('../implementations/did-photon-transmute.json'),
    require('../implementations/did-elem-transmute.json'),
    require('../implementations/did-key-mattr.json'),
    require('../implementations/did-web-mattr.json'),
    require('../implementations/did-sov-mattr.json'),
    require('../implementations/did-polygon-ayanworks.json'),
    require('../implementations/did-key-spruce.json'),
    require('../implementations/did-web-spruce.json'),
    require('../implementations/did-tz-spruce.json'),
    require('../implementations/did-onion-spruce.json'),
    require('../implementations/did-pkh-spruce.json'),
    require('../implementations/did-webkey-spruce.json'),
    require('../implementations/did-web-evernym.json'),
    require('../implementations/did-ebsi.json'),
    require('../implementations/did-ssb.json'),
    require('../implementations/did-algo.json'),
    ...brokenFixtures
  ]
};
