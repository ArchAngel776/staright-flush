"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MigrationCreate = _interopRequireDefault(require("./MigrationCreate"));

var _MigrationDown = _interopRequireDefault(require("./MigrationDown"));

var _MigrationUp = _interopRequireDefault(require("./MigrationUp"));

var _TestCommand = _interopRequireDefault(require("./TestCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commands = {
  "test-command": _TestCommand.default,
  "migration/create": _MigrationCreate.default,
  "migration/up": _MigrationUp.default,
  "migration/down": _MigrationDown.default
};
var _default = commands;
exports.default = _default;