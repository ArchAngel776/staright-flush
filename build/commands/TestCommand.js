"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Command2 = _interopRequireDefault(require("../core/Command"));

var _isDefined = _interopRequireDefault(require("../core/hooks/isDefined"));

var _TestThrowException = _interopRequireDefault(require("../exceptions/TestThrowException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let TestCommand = /*#__PURE__*/function (_Command) {
  _inherits(TestCommand, _Command);

  function TestCommand(testString) {
    var _this;

    _this = _Command.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "testString", void 0);

    _this.testString = testString;
    return _this;
  }

  _createClass(TestCommand, [{
    key: "init",
    value: function init() {
      if (!(0, _isDefined.default)(this.testString)) {
        this.testString = "foo";
      }
    }
  }, {
    key: "check",
    value: function check() {
      return this.testString.length > 0;
    }
  }, {
    key: "execute",
    value: function execute() {
      if (this.testString === "throw") {
        return TestCommand.THROW;
      }

      console.log(`Command with param: ${this.testString}`);
      return TestCommand.SUCCESS;
    }
  }, {
    key: "except",
    value: function except(status) {
      switch (status) {
        case TestCommand.THROW:
          throw new _TestThrowException.default();

        default:
          _get(_getPrototypeOf(TestCommand.prototype), "except", this).call(this, status);

      }
    }
  }]);

  return TestCommand;
}(_Command2.default);

exports.default = TestCommand;

_defineProperty(TestCommand, "THROW", -2);