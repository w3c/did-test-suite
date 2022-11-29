const brokenFixtures = process.env.DID_WG_INCLUDE_BREAKING ? [
  require('../implementations/universal-resolver-did-gatc.json'),
  require('../implementations/universal-resolver-did-ccp.json'),
  require('../implementations/resolver-did-ion.json'),
  require('../implementations/resolver-polygon-ayanworks.json'),
  require('../implementations/universal-resolver-did-bid.json')
] : []

module.exports = {
  name: '7.1 DID Resolution',
  resolvers: [
    require('../implementations/universal-resolver-did-dxd.json'),
    require('../implementations/resolver-ethr-consensys-mesh.json'),
    require('../implementations/universal-resolver-did-ace.json'),
    require('../implementations/universal-resolver-did-bba.json'),
    require('../implementations/universal-resolver-did-btcr.json'),
    require('../implementations/universal-resolver-did-ebsi.json'),
    require('../implementations/universal-resolver-did-elem.json'),
    require('../implementations/universal-resolver-did-emtrust.json'),
    require('../implementations/universal-resolver-did-ethr.json'),
    require('../implementations/universal-resolver-did-evan.json'),
    require('../implementations/universal-resolver-did-github.json'),
    require('../implementations/universal-resolver-did-hcr.json'),
    require('../implementations/universal-resolver-did-icon.json'),
    require('../implementations/universal-resolver-did-io.json'),
    require('../implementations/universal-resolver-did-ion.json'),
    require('../implementations/universal-resolver-did-jolo.json'),
    require('../implementations/universal-resolver-did-key.json'),
    require('../implementations/universal-resolver-did-kilt.json'),
    require('../implementations/universal-resolver-did-lit.json'),
    require('../implementations/universal-resolver-did-mpg.json'),
    require('../implementations/universal-resolver-did-nacl.json'),
    require('../implementations/universal-resolver-did-ont.json'),
    require('../implementations/universal-resolver-did-schema.json'),
    require('../implementations/universal-resolver-did-sol.json'),
    require('../implementations/universal-resolver-did-sov.json'),
    require('../implementations/universal-resolver-did-stack.json'),
    require('../implementations/universal-resolver-did-trust.json'),
    require('../implementations/universal-resolver-did-unisot.json'),
    require('../implementations/universal-resolver-did-v1.json'),
    require('../implementations/universal-resolver-did-vaa.json'),
    require('../implementations/universal-resolver-did-web.json'),
    require('../implementations/universal-resolver-did-work.json'),
    require('../implementations/universal-resolver-resolver-tests.json'),
    require('../implementations/universal-resolver-did-art.json'),
    require('../implementations/resolver-did-orb.json'),
    require('../implementations/resolver-nft-3box-labs.json'),
    require('../implementations/resolver-example-didwg.json'),
    require('../implementations/resolver-3-3box-labs.json'),
    require('../implementations/resolver-mattr-key.json'),
    require('../implementations/resolver-mattr-web.json'),
    require('../implementations/resolver-mattr-sov.json'),
    require('../implementations/resolver-spruce-key.json'),
    require('../implementations/resolver-spruce-web.json'),
    require('../implementations/resolver-spruce-tz.json'),
    require('../implementations/resolver-spruce-onion.json'),
    require('../implementations/resolver-spruce-pkh.json'),
    require('../implementations/resolver-spruce-webkey.json'),
    require('../implementations/resolver-ssb.json'),
    require('../implementations/resolver-did-cheqd.json'),
    ...brokenFixtures
  ],
};
