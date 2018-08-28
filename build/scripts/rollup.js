"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = void 0;

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginBabel = _interopRequireDefault(require("rollup-plugin-babel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rollup = require('rollup');

var buildReact =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var inputOptions, bundle, outputOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('\nBundling React Components...'); // see below for details on the options

            inputOptions = {
              input: "dist/react/index.js",
              external: ["react", "prop-types", "styled-components"],
              plugins: [(0, _rollupPluginNodeResolve.default)(), (0, _rollupPluginBabel.default)({
                babelrc: false,
                sourceMaps: true,
                presets: [["@babel/env", {
                  modules: false,
                  shippedProposals: true
                }], "@babel/react"],
                plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties"],
                exclude: "node_modules/**"
              })]
            }; // create a bundle

            _context.next = 4;
            return rollup.rollup(inputOptions);

          case 4:
            bundle = _context.sent;
            // console.log(bundle.imports); // an array of external dependencies
            // console.log(bundle.exports); // an array of names exported by the entry point
            // console.log(bundle.modules); // an array of module objects
            outputOptions = {
              file: "dist/bundles/bundle.react.js",
              format: "cjs"
            }; // or write the bundle to disk

            _context.next = 8;
            return bundle.write(outputOptions);

          case 8:
            console.log('Done!');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function buildReact() {
    return _ref.apply(this, arguments);
  };
}();

var buildVue =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var inputOptions, bundle, outputOptions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('\nBundling Vue Components...'); // see below for details on the options

            inputOptions = {
              input: "dist/vue/index.js",
              // All the used libs needs to be here
              external: ["vue-styled-components"],
              plugins: [(0, _rollupPluginNodeResolve.default)(), (0, _rollupPluginBabel.default)({
                babelrc: false,
                presets: [["@babel/env", {
                  modules: false
                }], "vue"],
                plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties"],
                exclude: "node_modules/**"
              })]
            }; // create a bundle

            _context2.next = 4;
            return rollup.rollup(inputOptions);

          case 4:
            bundle = _context2.sent;
            // console.log(bundle.imports); // an array of external dependencies
            // console.log(bundle.exports); // an array of names exported by the entry point
            // console.log(bundle.modules); // an array of module objects
            outputOptions = {
              file: "dist/bundles/bundle.vue.js",
              format: "cjs"
            }; // or write the bundle to disk

            _context2.next = 8;
            return bundle.write(outputOptions);

          case 8:
            console.log('Done!');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function buildVue() {
    return _ref2.apply(this, arguments);
  };
}();

var build =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return buildReact();

          case 2:
            _context3.next = 4;
            return buildVue();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function build() {
    return _ref3.apply(this, arguments);
  };
}();

exports.build = build;