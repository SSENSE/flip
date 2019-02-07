"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dirCheck = exports.generateComponents = void 0;

var fs = _interopRequireWildcard(require("fs-extra"));

var _transpile = require("./transpile");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
*
* Run our component generation suite
*
* Args:
*  - pathToComponents: string
*
* */
var generateComponents =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(pathToComponents) {
    var pathToStyles,
        log,
        frameworks,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathToStyles = _args.length > 1 && _args[1] !== undefined ? _args[1] : "styles";
            log = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
            _context.prev = 2;

            if (log) {
              console.log("\nChecking dist directory structure...");
            }

            frameworks = ["react", "vue"];
            _context.next = 7;
            return dirCheck(frameworks, pathToStyles);

          case 7:
            if (log) {
              console.log("\nTranspiling components...");
            }

            _context.next = 10;
            return (0, _transpile.translateComponents)(pathToComponents);

          case 10:
            if (log) {
              console.log("\nBuilding exports...");
            }

            _context.next = 13;
            return generateExports("react");

          case 13:
            _context.next = 15;
            return generateExports("vue");

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 17]]);
  }));

  return function generateComponents(_x) {
    return _ref.apply(this, arguments);
  };
}();
/*
*
* Generate an index.js file in each framework directory importing
* and exporting all of it's components.
*
* Args:
*  - framework: string
*
* */


exports.generateComponents = generateComponents;

var generateExports =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(framework) {
    var imports, exports, results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imports = [];
            exports = [];
            _context2.next = 4;
            return fs.readdirSync("dist/".concat(framework));

          case 4:
            results = _context2.sent;
            _context2.next = 7;
            return results.filter(function (result) {
              return !result.includes(".");
            }).forEach(function (dirName) {
              // we use ../ vs absolute import because rollup needs to see a relative path
              imports.push("import ".concat(dirName, " from './").concat(dirName, "/index.jsx';"));
              exports.push("exports.".concat(dirName, " = ").concat(dirName, ";"));
            });

          case 7:
            _context2.next = 9;
            return fs.writeFileSync("dist/".concat(framework, "/index.js"), imports.join("\n"));

          case 9:
            _context2.next = 11;
            return fs.appendFileSync("dist/".concat(framework, "/index.js"), "\n" + exports.join("\n"));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function generateExports(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/*
*
*  Ensure our dist file structure is prepared for writing.
*  This is run on every translation attempt, and checks to make sure
*  each component director exists before writing it's index
*
* Args:
*  - framework: string
*
* */


var dirCheck =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(frameworks, stylesDir) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fs.existsSync("dist");

          case 2:
            if (_context4.sent) {
              _context4.next = 10;
              break;
            }

            _context4.next = 5;
            return fs.mkdirSync("dist");

          case 5:
            if (fs.existsSync("dist/styles")) {
              _context4.next = 10;
              break;
            }

            _context4.next = 8;
            return fs.mkdirSync("dist/styles");

          case 8:
            _context4.next = 10;
            return fs.copy("".concat(stylesDir), "dist/styles");

          case 10:
            frameworks.forEach(
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(framework) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return fs.existsSync("dist/".concat(framework));

                      case 2:
                        if (_context3.sent) {
                          _context3.next = 5;
                          break;
                        }

                        _context3.next = 5;
                        return fs.mkdirSync("dist/".concat(framework));

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function dirCheck(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.dirCheck = dirCheck;