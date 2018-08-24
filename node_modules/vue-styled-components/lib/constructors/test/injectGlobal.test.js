'use strict';

var _templateObject = _taggedTemplateLiteral(['\n      html {\n        ', '\n      }\n    '], ['\n      html {\n        ', '\n      }\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      a {\n        ', '\n      }\n    '], ['\n      a {\n        ', '\n      }\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n      ', '\n    '], ['\n      ', '\n    ']);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _injectGlobal = require('../injectGlobal');

var _injectGlobal2 = _interopRequireDefault(_injectGlobal);

var _StyleSheet = require('../../models/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _utils = require('../../test/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styled = (0, _utils.resetStyled)();
var rule1 = 'width: 100%;';
var rule2 = 'margin: 0;';
var rule3 = 'color: blue;';

describe('injectGlobal', function () {
  beforeEach(function () {
    (0, _utils.resetStyled)();
  });

  it('should inject rules into the head', function () {
    (0, _injectGlobal2.default)(_templateObject, rule1);
    (0, _expect2.default)(_StyleSheet2.default.injected).toBe(true);
  });

  it('should non-destructively inject styles when called repeatedly', function () {
    (0, _injectGlobal2.default)(_templateObject, rule1);

    (0, _injectGlobal2.default)(_templateObject2, rule2);
    (0, _utils.expectCSSMatches)('\n      html {' + rule1 + '}\n      a {' + rule2 + '}\n    ', { styleSheet: _StyleSheet2.default });
  });

  it('should inject styles in a separate sheet from a component', function () {
    var Comp = styled.div(_templateObject3, rule3);
    var vm = new _vue2.default(Comp).$mount();

    (0, _injectGlobal2.default)(_templateObject, rule1);

    (0, _utils.expectCSSMatches)('\n      .a {' + rule3 + '}\n    ', { styleSheet: _StyleSheet2.default.componentStyleSheet });

    (0, _utils.expectCSSMatches)('\n      html {' + rule1 + '}\n    ', { styleSheet: _StyleSheet2.default.globalStyleSheet });
  });
});