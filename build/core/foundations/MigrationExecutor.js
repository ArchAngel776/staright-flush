"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EmptyMigrationException = _interopRequireDefault(require("../../exceptions/EmptyMigrationException"));

var _MigrationManager = _interopRequireDefault(require("../components/MigrationManager"));

var _MigrationCommand2 = _interopRequireDefault(require("./MigrationCommand"));

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

let MigrationExecutor = /*#__PURE__*/function (_MigrationCommand) {
  _inherits(MigrationExecutor, _MigrationCommand);

  function MigrationExecutor() {
    var _this;

    _this = _MigrationCommand.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "migrationManager", void 0);

    _defineProperty(_assertThisInitialized(_this), "migrations", void 0);

    _defineProperty(_assertThisInitialized(_this), "currentMigration", void 0);

    _this.migrationManager = new _MigrationManager.default();
    _this.migrations = [];
    _this.currentMigration = null;
    return _this;
  }

  _createClass(MigrationExecutor, [{
    key: "check",
    value: function check() {
      if (!_get(_getPrototypeOf(MigrationExecutor.prototype), "check", this).call(this)) {
        return false;
      }

      const migrations = this.migrationDir.list();

      if (!migrations) {
        return false;
      }

      this.migrations = migrations.filter(migration => this.migrationPattern.test(migration));
      return true;
    }
  }, {
    key: "migrationPattern",
    get: function () {
      return new RegExp(`^${MigrationExecutor.MIGRATION_PREFIX}_(.+)\\.js$`);
    }
  }, {
    key: "current",
    get: function () {
      if (this.currentMigration) {
        return this.currentMigration;
      }

      throw new _EmptyMigrationException.default();
    },
    set: function (migration) {
      this.currentMigration = migration;
    }
  }]);

  return MigrationExecutor;
}(_MigrationCommand2.default);

exports.default = MigrationExecutor;