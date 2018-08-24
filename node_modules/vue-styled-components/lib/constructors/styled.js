'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

var _domElements = require('../utils/domElements');

var _domElements2 = _interopRequireDefault(_domElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (createStyledComponent) {
  var styled = function styled(tagName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (cssRules) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return createStyledComponent(tagName, _css2.default.apply(undefined, [cssRules].concat(interpolations)), props);
    };
  };

  _domElements2.default.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
};

module.exports = exports['default'];