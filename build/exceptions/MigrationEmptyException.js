"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Except = _interopRequireDefault(require("../core/decorators/Except"));

var _Exception2 = _interopRequireDefault(require("../core/Exception"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let MigrationEmptyException = (0, _Except.default)(_class = /*#__PURE__*/function (_Exception) {
  _inherits(MigrationEmptyException, _Exception);

  function MigrationEmptyException() {
    return _Exception.apply(this, arguments) || this;
  }

  _createClass(MigrationEmptyException, [{
    key: "getName",
    value: function getName() {
      return "Migration Empty Exception";
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      return "Cannot load migration files";
    }
  }]);

  return MigrationEmptyException;
}(_Exception2.default)) || _class;

exports.default = MigrationEmptyException;