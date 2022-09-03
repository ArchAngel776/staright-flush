"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CommandErrorException = _interopRequireDefault(require("../exceptions/CommandErrorException"));

var _UnknownCommandStatusException = _interopRequireDefault(require("../exceptions/UnknownCommandStatusException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Command = /*#__PURE__*/function () {
  function Command() {}

  _createClass(Command, [{
    key: "init",
    value: function init() {
      void 0;
    }
  }, {
    key: "check",
    value: function check() {
      return true;
    }
  }, {
    key: "except",
    value: function except(status) {
      switch (status) {
        case Command.SUCCESS:
          return;

        case Command.ERROR:
          throw new _CommandErrorException.default();

        default:
          throw new _UnknownCommandStatusException.default(status);
      }
    }
  }]);

  return Command;
}();

exports.default = Command;

_defineProperty(Command, "SUCCESS", 0);

_defineProperty(Command, "ERROR", -1);