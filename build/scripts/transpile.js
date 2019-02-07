"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPath = exports.copyComponent = exports.reactToVue = exports.translateComponents = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _core = require("@babel/core");

var _reactToVue = _interopRequireDefault(require("../utils/react-to-vue"));

var _vuePreset = _interopRequireDefault(require("../utils/vue-preset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
*
* Send each component to be translated and copied into dist
*
* Args:
*  - path: string
*
* */
var translateComponents =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(path) {
    var components, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            components = [];
            _context2.next = 3;
            return fs.readdirSync(path);

          case 3:
            result = _context2.sent;
            _context2.next = 6;
            return result.forEach(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(dirName) {
                var pathAndDir;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        pathAndDir = path + "/".concat(dirName); // copy react components to dist

                        components.push(copyComponent(pathAndDir)); // translate react components to vue components

                        components.push(reactToVue(pathAndDir));

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 6:
            return _context2.abrupt("return", Promise.all(components));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function translateComponents(_x) {
    return _ref.apply(this, arguments);
  };
}();
/*
*
* Use the babel api to run a custom plugin that converts react to vue.
*
* Args:
*  - path: string
*
* */


exports.translateComponents = translateComponents;

var reactToVue =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(path) {
    var _ref4, extension, dirName, newPath, _transformFileSync, code, vuePath;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return buildPath(path);

          case 3:
            _ref4 = _context3.sent;
            extension = _ref4.extension;
            dirName = _ref4.dirName;
            newPath = _ref4.newPath;
            // use custom babel plugin to transform file
            // source: src/utils/vue-to-react
            _transformFileSync = (0, _core.transformFileSync)(newPath, {
              babelrc: false,
              presets: [[_vuePreset.default, {
                eventModifiers: false,
                vModel: false
              }]],
              plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-object-rest-spread", _reactToVue.default]
            }), code = _transformFileSync.code;
            vuePath = "dist/vue/".concat(dirName, "/index.").concat(extension);
            _context3.next = 11;
            return fs.existsSync("dist/vue/".concat(dirName));

          case 11:
            if (_context3.sent) {
              _context3.next = 14;
              break;
            }

            _context3.next = 14;
            return fs.mkdirSync("dist/vue/".concat(dirName));

          case 14:
            _context3.next = 16;
            return fs.writeFileSync(vuePath, code);

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 18]]);
  }));

  return function reactToVue(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/*
 *
 * Copies components into the dist directory.
 *
 * Args:
 *  - path: string
 *
 * */


exports.reactToVue = reactToVue;

var copyComponent =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(path) {
    var _ref6, extension, newPath, dirName, reactPath;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return buildPath(path);

          case 3:
            _ref6 = _context4.sent;
            extension = _ref6.extension;
            newPath = _ref6.newPath;
            dirName = _ref6.dirName;
            reactPath = "dist/react/".concat(dirName, "/index.").concat(extension);
            _context4.next = 10;
            return fs.existsSync("dist/react/".concat(dirName));

          case 10:
            if (_context4.sent) {
              _context4.next = 13;
              break;
            }

            _context4.next = 13;
            return fs.mkdirSync("dist/react/".concat(dirName));

          case 13:
            _context4.next = 15;
            return fs.copyFileSync(newPath, reactPath);

          case 15:
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 17]]);
  }));

  return function copyComponent(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
/*
 *
 * Build paths to use during transpilation.
 *
 * Args:
 *  - path: string
 *
 * */


exports.copyComponent = copyComponent;

var buildPath =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(path) {
    var extension, splitPath, dirName;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            extension = "";

            if (fs.existsSync("".concat(path, "/index.jsx"))) {
              path += "/index.jsx";
              extension = "jsx";
            } else {
              path += "/index.js";
              extension = "js";
            }

            splitPath = path.split("/");
            dirName = splitPath[splitPath.length - 2];
            return _context5.abrupt("return", {
              extension: extension,
              newPath: path,
              dirName: dirName
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function buildPath(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.buildPath = buildPath;