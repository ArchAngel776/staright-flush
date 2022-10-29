"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Env = _interopRequireDefault(require("../../Env"));

var _mongodb = require("mongodb");

var _MongoUrl = _interopRequireDefault(require("../helpers/MongoUrl"));

var _Transaction = _interopRequireDefault(require("./Transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Connection = /*#__PURE__*/function () {
  function Connection(host, port, database, user, password) {
    _defineProperty(this, "mongoURL", void 0);

    _defineProperty(this, "database", void 0);

    this.mongoURL = new _MongoUrl.default(host, port, database, user, password);
    this.database = database;
  }

  _createClass(Connection, [{
    key: "setHost",
    value: function setHost(host) {
      this.mongoURL.setHost(host);
      return this;
    }
  }, {
    key: "setPort",
    value: function setPort(port) {
      this.mongoURL.setPort(port);
      return this;
    }
  }, {
    key: "setUser",
    value: function setUser(user) {
      this.mongoURL.setUser(user);
      return this;
    }
  }, {
    key: "setPassword",
    value: function setPassword(password) {
      this.mongoURL.setPassword(password);
      return this;
    }
  }, {
    key: "setDatabase",
    value: function setDatabase(database) {
      this.mongoURL.setDatabase(this.database = database);
      return this;
    }
  }, {
    key: "getClient",
    value: function getClient() {
      return new _mongodb.MongoClient(this.mongoURL.buildURL()).connect();
    }
  }, {
    key: "make",
    value: async function make(operation) {
      const client = await this.getClient();
      const result = await operation(client.db(this.database));
      client.close();
      return result;
    }
  }, {
    key: "beginTransaction",
    value: async function beginTransaction() {
      const client = await this.getClient();
      const transaction = new _Transaction.default(client, this.database);
      transaction.init();
      return transaction;
    }
  }], [{
    key: "getConnection",
    value: function getConnection() {
      return this.instance;
    }
  }]);

  return Connection;
}();

exports.default = Connection;

_defineProperty(Connection, "instance", new Connection(_Env.default.DB_HOST, parseInt(_Env.default.DB_PORT), _Env.default.DB_NAME, _Env.default.DB_USER, _Env.default.DB_PASS));