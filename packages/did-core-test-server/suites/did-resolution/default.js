module.exports = {
  "name": "7.1 DID Resolution",
  "resolvers": [
    require('../implementations/resolver-example-didwg.json'),
    require('../implementations/resolver-3-3box-labs.json')/*,
    require('../implementations/resolver-ethr-consensys-mesh.json')*/
  ]
}
