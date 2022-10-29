"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _String = require("../data/enums/String");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let MongoURL = /*#__PURE__*/function () {
  function MongoURL(host, port, database, user, password) {
    _defineProperty(this, "host", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "database", void 0);

    _defineProperty(this, "user", void 0);

    _defineProperty(this, "password", void 0);

    this.host = host;
    this.port = port;
    this.database = database || null;
    this.user = user || null;
    this.password = password || null;
  }

  _createClass(MongoURL, [{
    key: "setHost",
    value: function setHost(host) {
      this.host = host;
      return this;
    }
  }, {
    key: "setPort",
    value: function setPort(port) {
      this.port = port;
      return this;
    }
  }, {
    key: "setDatabase",
    value: function setDatabase(database) {
      this.database = database;
      return this;
    }
  }, {
    key: "setUser",
    value: function setUser(user) {
      this.user = user;
      return this;
    }
  }, {
    key: "setPassword",
    value: function setPassword(password) {
      this.password = password;
      return this;
    }
  }, {
    key: "credentials",
    get: function () {
      return this.user && this.password ? `${this.user}:${this.password}@` : _String.String.EMPTY;
    }
  }, {
    key: "buildURL",
    value: function buildURL() {
      return `mongodb://${this.credentials}${this.host}:${this.port}/${this.database}`;
    }
  }]);

  return MongoURL;
}();

exports.default = MongoURL;