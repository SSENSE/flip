#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _scripts = require("./scripts");

var _rollup = require("./scripts/rollup");

var fs = _interopRequireWildcard(require("fs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var program = require("commander");

var _JSON$parse = JSON.parse(fs.readFileSync("package.json", "utf8")),
    version = _JSON$parse.version;

program.version(version).command("<dir>", "Transpile components in this directory").option("-s", "--style", "Location of styles directory").option("-b", "--bundle", "Bundle components").action(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(dir, _ref) {
    var B, S;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            B = _ref.B, S = _ref.S;
            _context.next = 3;
            return (0, _scripts.generateComponents)(dir, S);

          case 3:
            if (!B) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return (0, _rollup.build)().catch(function (e) {
              return console.log(e);
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}()).parse(process.argv);