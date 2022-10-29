"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MigrationFilesPrint;

var _Console = require("../data/enums/Console");

var _print = _interopRequireDefault(require("../hooks/print"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MigrationFilesPrint(titlePrint) {
  return function (target, property, descriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args) {
      (0, _print.default)(titlePrint);
      this.migrations.forEach(migration => (0, _print.default)(migration, _Console.Console.YELLOW));
      (0, _print.default)();
      return method.call(this, ...args);
    };
  };
}