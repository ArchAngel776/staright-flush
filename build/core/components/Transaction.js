"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _CloseClient = _interopRequireDefault(require("../decorators/CloseClient"));

var _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let Transaction = (_class = (_class2 = /*#__PURE__*/function () {
  function Transaction(client, database) {
    _defineProperty(this, "_client", void 0);

    _defineProperty(this, "session", void 0);

    _defineProperty(this, "database", void 0);

    this._client = client;
    this.session = client.startSession();
    this.database = client.db(database);
  }

  _createClass(Transaction, [{
    key: "init",
    value: function init() {
      this.session.startTransaction(Transaction.OPTIONS);
    }
  }, {
    key: "make",
    value: function make(operation) {
      return operation(this.database, this.session);
    }
  }, {
    key: "commit",
    value: async function commit() {
      try {
        await this.session.commitTransaction();
      } catch (error) {
        await this.session.abortTransaction();
        throw error;
      }
    }
  }, {
    key: "rollback",
    value: async function rollback() {
      await this.session.abortTransaction();
    }
  }, {
    key: "client",
    get: function () {
      return this._client;
    }
  }]);

  return Transaction;
}(), _defineProperty(_class2, "OPTIONS", {
  readConcern: {
    level: "local"
  },
  writeConcern: {
    w: 2
  },
  readPreference: new _mongodb.ReadPreference("secondaryPreferred")
}), _class2), (_applyDecoratedDescriptor(_class.prototype, "commit", [_CloseClient.default], Object.getOwnPropertyDescriptor(_class.prototype, "commit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "rollback", [_CloseClient.default], Object.getOwnPropertyDescriptor(_class.prototype, "rollback"), _class.prototype)), _class);
exports.default = Transaction;