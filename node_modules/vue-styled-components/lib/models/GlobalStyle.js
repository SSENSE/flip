'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flatten = require('../utils/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _StyleSheet = require('./StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _stylis = require('stylis');

var _stylis2 = _interopRequireDefault(_stylis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentStyle = function () {
  function ComponentStyle(rules, selector) {
    _classCallCheck(this, ComponentStyle);

    this.rules = rules;
    this.selector = selector;
  }

  _createClass(ComponentStyle, [{
    key: 'generateAndInject',
    value: function generateAndInject() {
      if (!_StyleSheet2.default.injected) _StyleSheet2.default.inject();
      var flatCSS = (0, _flatten2.default)(this.rules).join('');
      var cssString = this.selector ? this.selector + ' { ' + flatCSS + ' }' : flatCSS;
      var css = (0, _stylis2.default)('', cssString, false, false);
      _StyleSheet2.default.insert(css, { global: true });
    }
  }]);

  return ComponentStyle;
}();

exports.default = ComponentStyle;
module.exports = exports['default'];