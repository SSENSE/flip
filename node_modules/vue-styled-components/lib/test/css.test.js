'use strict';

var _templateObject = _taggedTemplateLiteral(['\n      transition: opacity 0.3s;\n    '], ['\n      transition: opacity 0.3s;\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    '], ['\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n      margin-bottom: calc(15px - 0.5rem) !important;\n    '], ['\n      margin-bottom: calc(15px - 0.5rem) !important;\n    ']),
    _templateObject4 = _taggedTemplateLiteral(['\n      --custom-prop: some-val;\n    '], ['\n      --custom-prop: some-val;\n    ']);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styled = void 0;
var stripLineBreaks = function stripLineBreaks(str) {
  return str.split('\n').map(function (l) {
    return l.trim();
  }).join('');
};

describe('css features', function () {
  beforeEach(function () {
    styled = (0, _utils.resetStyled)();
  });

  it('should add vendor prefixes in the right order', function () {
    var Comp = styled.div(_templateObject);
    var vm = new _vue2.default(Comp).$mount();
    (0, _utils.expectCSSMatches)('.a {-webkit-transition: opacity 0.3s;transition: opacity 0.3s;}');
  });

  it('should add vendor prefixes for display', function () {
    var Comp = styled.div(_templateObject2);
    var vm = new _vue2.default(Comp).$mount();
    (0, _utils.expectCSSMatches)(stripLineBreaks('\n      .a {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -webkit-align-items: center;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n      }\n    '));
  });

  it('should handle CSS calc()', function () {
    var Comp = styled.div(_templateObject3);
    var vm = new _vue2.default(Comp).$mount();
    (0, _utils.expectCSSMatches)('.a {margin-bottom: calc(15px - 0.5rem) !important;}');
  });

  it('should pass through custom properties', function () {
    var Comp = styled.div(_templateObject4);
    var vm = new _vue2.default(Comp).$mount();
    (0, _utils.expectCSSMatches)('.a {--custom-prop: some-val;}');
  });
});