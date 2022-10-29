"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MigrationCommand2 = _interopRequireDefault(require("../core/foundations/MigrationCommand"));

var _DateHelper = _interopRequireDefault(require("../core/helpers/DateHelper"));

var _Migration = _interopRequireDefault(require("../core/Migration"));

var _MigrationCreateException = _interopRequireDefault(require("../exceptions/MigrationCreateException"));

var _MigrationTemplate = _interopRequireDefault(require("../templates/MigrationTemplate"));

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

let MigrationCreate = /*#__PURE__*/function (_MigrationCommand) {
  _inherits(MigrationCreate, _MigrationCommand);

  /**
   * Custom statuses
   */
  function MigrationCreate(name) {
    var _this;

    _this = _MigrationCommand.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "name", void 0);

    _defineProperty(_assertThisInitialized(_this), "date", void 0);

    _this.name = name;
    _this.date = new Date();
    return _this;
  }

  _createClass(MigrationCreate, [{
    key: "execute",
    value: function execute() {
      const template = new _MigrationTemplate.default();
      this.migrationDir.save(this.migrationFileName, template.with(_MigrationTemplate.default.PARAM_MIGRATION, this.migrationName).with(_MigrationTemplate.default.PARAM_BASE, _Migration.default.name).make());

      if (!this.migrationDir.has(this.migrationFileName)) {
        return MigrationCreate.MIGRATION_CREATE_ERROR;
      }

      return MigrationCreate.SUCCESS;
    }
  }, {
    key: "except",
    value: function except(status) {
      switch (status) {
        case MigrationCreate.MIGRATION_CREATE_ERROR:
          throw new _MigrationCreateException.default();

        default:
          return _get(_getPrototypeOf(MigrationCreate.prototype), "except", this).call(this, status);
      }
    }
  }, {
    key: "migrationName",
    get: function () {
      return `${MigrationCreate.MIGRATION_PREFIX}_${_DateHelper.default.format("d_m_Y_His", this.date)}_${this.name}`;
    }
  }, {
    key: "migrationFileName",
    get: function () {
      return `${this.migrationName}.js`;
    }
  }]);

  return MigrationCreate;
}(_MigrationCommand2.default);

exports.default = MigrationCreate;

_defineProperty(MigrationCreate, "MIGRATION_CREATE_ERROR", -2);