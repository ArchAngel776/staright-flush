"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Connection = _interopRequireDefault(require("./Connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let MigrationManager = /*#__PURE__*/function () {
  function MigrationManager() {
    _defineProperty(this, "connection", void 0);

    this.connection = _Connection.default.getConnection();
  }

  _createClass(MigrationManager, [{
    key: "execute",
    value: async function execute(operation) {
      const transaction = await this.connection.beginTransaction();

      try {
        const result = await transaction.make(operation);
        await transaction.commit();
        return result;
      } catch (exception) {
        console.log(exception);
        await transaction.rollback();
        return false;
      }
    }
  }, {
    key: "executeApplying",
    value: function executeApplying(Migration) {
      return this.execute((database, session) => new Migration(database, session).apply());
    }
  }, {
    key: "executeReverting",
    value: function executeReverting(Migration) {
      return this.execute((database, session) => new Migration(database, session).revert());
    }
  }]);

  return MigrationManager;
}();

exports.default = MigrationManager;