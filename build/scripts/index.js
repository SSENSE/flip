"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateComponents = void 0;

var _scrape = require("./scrape");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
*
* Run our component generation suite
*
* Args:
*  - framework: string
*
* */
var generateComponents =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(pathToComponents) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('\nChecking dist directory structure...');
            _context.next = 3;
            return (0, _scrape.dirCheck)("react");

          case 3:
            _context.next = 5;
            return (0, _scrape.dirCheck)("vue");

          case 5:
            console.log('\nTranspiling components...');
            _context.next = 8;
            return (0, _scrape.translateComponents)(pathToComponents);

          case 8:
            console.log('\nBuilding exports...');
            _context.next = 11;
            return (0, _scrape.generateExports)("react");

          case 11:
            _context.next = 13;
            return (0, _scrape.generateExports)("vue");

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function generateComponents(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateComponents = generateComponents;