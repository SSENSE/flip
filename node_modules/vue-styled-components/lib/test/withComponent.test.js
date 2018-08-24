'use strict';

var _templateObject = _taggedTemplateLiteral(['color: blue;'], ['color: blue;']);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _chai = require('chai');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styled = void 0;

describe('extending styled', function () {
  beforeEach(function () {
    styled = (0, _utils.resetStyled)();
  });

  it('should change the target element', function () {
    var OldTarget = styled.div(_templateObject);
    var NewTarget = OldTarget.withComponent('a');

    var o = new _vue2.default(OldTarget).$mount();
    var n = new _vue2.default(NewTarget).$mount();

    (0, _chai.assert)(o._vnode.tag === 'div');
    (0, _chai.assert)(n._vnode.tag === 'a');
  });
});