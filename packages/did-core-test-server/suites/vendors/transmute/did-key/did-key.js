const fixtures = require('./index');

module.exports = {
  // ed25519 + x2219
  [fixtures.ed25519.key[0].resolution['application/did+json'].didDocument.id]:
    fixtures.ed25519.key[0].resolution,
  // bls12381
  [fixtures.bls12381_g1andg2.key[0].resolution['application/did+json']
    .didDocument.id]: fixtures.bls12381_g1andg2.key[0].resolution,
  // x25519
  [fixtures.x25519.key[0].resolution['application/did+json'].didDocument.id]:
    fixtures.x25519.key[0].resolution,
  // p-256
  [fixtures['p-256'].key[0].resolution['application/did+json'].didDocument.id]:
    fixtures['p-256'].key[0].resolution,
  // p-384
  [fixtures['p-384'].key[0].resolution['application/did+json'].didDocument.id]:
    fixtures['p-384'].key[0].resolution,
  // p-521
  [fixtures['p-521'].key[0].resolution['application/did+json'].didDocument.id]:
    fixtures['p-521'].key[0].resolution,
  // secp256k1
  [fixtures.secp256k1.key[0].resolution['application/did+json'].didDocument.id]:
    fixtures.secp256k1.key[0].resolution,
};
