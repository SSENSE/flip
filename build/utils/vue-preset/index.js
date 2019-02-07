"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _babelPluginTransformVueJsx = _interopRequireDefault(require("babel-plugin-transform-vue-jsx"));

var _babelPluginJsxEventModifiers = _interopRequireDefault(require("babel-plugin-jsx-event-modifiers"));

var _babelPluginJsxVModel = _interopRequireDefault(require("babel-plugin-jsx-v-model"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var _default = function _default(_) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$eventModifiers = _ref.eventModifiers,
      eventModifiers = _ref$eventModifiers === void 0 ? true : _ref$eventModifiers,
      _ref$vModel = _ref.vModel,
      vModel = _ref$vModel === void 0 ? true : _ref$vModel;

  return {
    plugins: [eventModifiers && _babelPluginJsxEventModifiers.default, vModel && _babelPluginJsxVModel.default, _babelPluginTransformVueJsx.default].filter(Boolean)
  };
};

exports.default = _default;