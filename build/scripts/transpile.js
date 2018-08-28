"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyComponent = exports.reactToVue = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _core = require("@babel/core");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
*
* Use the babel api to run a custom plugin that converts react to vue.
*
* Args:
*  - path: string
*
* */
var reactToVue =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(path) {
    var splitPath, dirName, _transformFileSync, code, vuePath;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path += "/index.js";
            splitPath = path.split("/");
            dirName = splitPath[splitPath.length - 2]; //use custom babel plugin (defined in .babelrc) to transform file

            _transformFileSync = (0, _core.transformFileSync)(path, {
              plugins: ["./utils/vue-to-react/"]
            }), code = _transformFileSync.code;
            vuePath = "dist/vue/".concat(dirName, "/index.js");
            _context.next = 7;
            return fs.existsSync("dist/vue/".concat(dirName));

          case 7:
            if (_context.sent) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return fs.mkdirSync("dist/vue/".concat(dirName));

          case 10:
            _context.next = 12;
            return fs.writeFileSync(vuePath, code);

          case 12:
            _context.next = 16;
            break;

          case 14:
            _context.next = 16;
            return fs.writeFileSync(vuePath, code);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function reactToVue(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.reactToVue = reactToVue;

var copyComponent =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(path) {
    var splitPath, dirName, reactPath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            path += "/index.js";
            splitPath = path.split("/");
            dirName = splitPath[splitPath.length - 2];
            reactPath = "dist/react/".concat(dirName, "/index.js");
            _context2.next = 6;
            return fs.existsSync("dist/react/".concat(dirName));

          case 6:
            if (_context2.sent) {
              _context2.next = 13;
              break;
            }

            _context2.next = 9;
            return fs.mkdirSync("dist/react/".concat(dirName));

          case 9:
            _context2.next = 11;
            return fs.copyFileSync(path, reactPath);

          case 11:
            _context2.next = 15;
            break;

          case 13:
            _context2.next = 15;
            return fs.copyFileSync(path, reactPath);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function copyComponent(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.copyComponent = copyComponent;