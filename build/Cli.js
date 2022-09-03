"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./commands/index"));

var _UnknownCommandException = _interopRequireDefault(require("./exceptions/UnknownCommandException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Cli = /*#__PURE__*/function () {
  function Cli(command, ...args) {
    _defineProperty(this, "command", void 0);

    _defineProperty(this, "arguments", void 0);

    this.command = command;
    this.arguments = args;
  }

  _createClass(Cli, [{
    key: "getCommand",
    value: function getCommand() {
      if (this.command in _index.default) {
        return _index.default[this.command];
      }

      throw new _UnknownCommandException.default(this.command);
    }
  }, {
    key: "run",
    value: function run() {
      const Command = this.getCommand();
      const command = new Command(...this.arguments);
      command.init();

      if (command.check()) {
        command.except(command.execute());
      }
    }
  }]);

  return Cli;
}();

exports.default = Cli;