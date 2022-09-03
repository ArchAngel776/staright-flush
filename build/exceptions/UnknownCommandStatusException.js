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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let UnknownCommandStatusException = (0, _Except.default)(_class = /*#__PURE__*/function (_Exception) {
  _inherits(UnknownCommandStatusException, _Exception);

  function UnknownCommandStatusException(status) {
    var _this;

    _this = _Exception.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "status", void 0);

    _this.status = status;
    return _this;
  }

  _createClass(UnknownCommandStatusException, [{
    key: "getName",
    value: function getName() {
      return "Unknown Command Status Exception";
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      return `Unknown status: ${this.status}`;
    }
  }]);

  return UnknownCommandStatusException;
}(_Exception2.default)) || _class;

exports.default = UnknownCommandStatusException;