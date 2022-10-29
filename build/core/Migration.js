"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Migration = /*#__PURE__*/function () {
  function Migration(database, session) {
    _defineProperty(this, "database", void 0);

    _defineProperty(this, "session", void 0);

    this.database = database;
    this.session = session;
  }

  _createClass(Migration, [{
    key: "hasCollection",
    value: async function hasCollection(name) {
      const collections = await this.database.collections();

      for (const collection of collections) {
        if (collection.collectionName === name) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "createCollection",
    value: function createCollection(name, schema) {
      return this.database.createCollection(name, {
        session: this.session,
        validator: {
          $jsonSchema: schema
        }
      });
    }
  }, {
    key: "dropCollection",
    value: function dropCollection(name) {
      return this.database.dropCollection(name, {
        session: this.session
      });
    }
  }, {
    key: "hasIndex",
    value: function hasIndex(name, collection) {
      return this.database.collection(collection).indexExists(name);
    }
  }, {
    key: "createIndex",
    value: function createIndex(name, collection, fields, unique = false) {
      if (!Array.isArray(fields)) {
        fields = [fields];
      }

      const index = {};
      fields.forEach(field => index[field] = 1);
      return this.database.collection(collection).createIndex(index, {
        name,
        unique,
        session: this.session
      });
    }
  }, {
    key: "dropIndex",
    value: function dropIndex(name, collection) {
      return this.database.collection(collection).dropIndex(name, {
        session: this.session
      });
    }
  }]);

  return Migration;
}();

exports.default = Migration;