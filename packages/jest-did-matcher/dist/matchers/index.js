'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('./toBeAsciiString/index.js');

var _toBeAsciiStringIndexJs = _interopRequireWildcard(_index);

var _index2 = require('./toBeBase58String/index.js');

var _toBeBase58StringIndexJs = _interopRequireWildcard(_index2);

var _index3 = require('./toBeDidCoreDatetime/index.js');

var _toBeDidCoreDatetimeIndexJs = _interopRequireWildcard(_index3);

var _index4 = require('./toBeInfraMap/index.js');

var _toBeInfraMapIndexJs = _interopRequireWildcard(_index4);

var _index5 = require('./toBeInfraString/index.js');

var _toBeInfraStringIndexJs = _interopRequireWildcard(_index5);

var _index6 = require('./toBeValidDid/index.js');

var _toBeValidDidIndexJs = _interopRequireWildcard(_index6);

var _index7 = require('./toBeValidDidUrl/index.js');

var _toBeValidDidUrlIndexJs = _interopRequireWildcard(_index7);

var _index8 = require('./toBeValidUri/index.js');

var _toBeValidUriIndexJs = _interopRequireWildcard(_index8);

var _index9 = require('./toBeValidUrl/index.js');

var _toBeValidUrlIndexJs = _interopRequireWildcard(_index9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const imports = {
  './toBeAsciiString/index.js': _toBeAsciiStringIndexJs,
  './toBeBase58String/index.js': _toBeBase58StringIndexJs,
  './toBeDidCoreDatetime/index.js': _toBeDidCoreDatetimeIndexJs,
  './toBeInfraMap/index.js': _toBeInfraMapIndexJs,
  './toBeInfraString/index.js': _toBeInfraStringIndexJs,
  './toBeValidDid/index.js': _toBeValidDidIndexJs,
  './toBeValidDidUrl/index.js': _toBeValidDidUrlIndexJs,
  './toBeValidUri/index.js': _toBeValidUriIndexJs,
  './toBeValidUrl/index.js': _toBeValidUrlIndexJs
};

exports.default = Object.keys(imports).map(key => imports[key]).reduce((acc, matcher) => _extends({}, acc, matcher.default), {});