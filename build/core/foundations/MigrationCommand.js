"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _Command2 = _interopRequireDefault(require("../Command"));

var _WorkSpace = _interopRequireDefault(require("../components/WorkSpace"));

var _root = _interopRequireDefault(require("../hooks/root"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let MigrationCommand = /*#__PURE__*/function (_Command) {
  _inherits(MigrationCommand, _Command);

  function MigrationCommand() {
    var _this;

    _this = _Command.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "path", void 0);

    _defineProperty(_assertThisInitialized(_this), "migrationDir", void 0);

    _this.path = (0, _path.resolve)((0, _root.default)(), MigrationCommand.MIGRATIONS_DIR);
    _this.migrationDir = new _WorkSpace.default(_this.path);
    return _this;
  }

  _createClass(MigrationCommand, [{
    key: "check",
    value: function check() {
      return this.migrationDir.isWorkSpace();
    }
  }]);

  return MigrationCommand;
}(_Command2.default);

exports.default = MigrationCommand;

_defineProperty(MigrationCommand, "MIGRATIONS_DIR", "migrations");

_defineProperty(MigrationCommand, "MIGRATION_PREFIX", "Migration");