"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fs = require("fs");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let WorkSpace = /*#__PURE__*/function () {
  function WorkSpace(spacePath) {
    _defineProperty(this, "spacePath", void 0);

    this.spacePath = spacePath;
  }

  _createClass(WorkSpace, [{
    key: "exist",
    value: function exist() {
      return (0, _fs.existsSync)(this.spacePath);
    }
  }, {
    key: "isWorkSpace",
    value: function isWorkSpace() {
      return (0, _fs.existsSync)(this.spacePath) && (0, _fs.lstatSync)(this.spacePath).isDirectory();
    }
  }, {
    key: "has",
    value: function has(name) {
      const path = (0, _path.resolve)(this.spacePath, name);
      return (0, _fs.existsSync)(path);
    }
  }, {
    key: "hasFile",
    value: function hasFile(name) {
      const path = (0, _path.resolve)(this.spacePath, name);
      return (0, _fs.existsSync)(path) && (0, _fs.lstatSync)(path).isFile();
    }
  }, {
    key: "hasDir",
    value: function hasDir(name) {
      const path = (0, _path.resolve)(this.spacePath, name);
      return (0, _fs.existsSync)(path) && (0, _fs.lstatSync)(path).isDirectory();
    }
  }, {
    key: "list",
    value: function list() {
      return this.isWorkSpace() ? (0, _fs.readdirSync)(this.spacePath, this.encoding) : null;
    }
  }, {
    key: "get",
    value: function get(name) {
      if (this.hasFile(name)) {
        const path = (0, _path.resolve)(this.spacePath, name);
        return (0, _fs.readFileSync)(path, this.encoding);
      }

      return null;
    }
  }, {
    key: "listDir",
    value: function listDir(name) {
      if (this.hasDir(name)) {
        const path = (0, _path.resolve)(this.spacePath, name);
        return (0, _fs.readdirSync)(path, this.encoding);
      }

      return null;
    }
  }, {
    key: "save",
    value: function save(name, content, append = false) {
      if (!this.isWorkSpace()) {
        return;
      }

      const path = (0, _path.resolve)(this.spacePath, name);

      if (append) {
        (0, _fs.appendFileSync)(path, content, this.encoding);
      } else {
        (0, _fs.writeFileSync)(path, content, this.encoding);
      }
    }
  }, {
    key: "createDir",
    value: function createDir(name) {
      if (this.isWorkSpace() && !this.hasDir(name)) {
        const path = (0, _path.resolve)(this.spacePath, name);
        (0, _fs.mkdirSync)(path);
      }
    }
  }, {
    key: "delete",
    value: function _delete(name) {
      if (!this.isWorkSpace()) {
        return;
      }

      const path = (0, _path.resolve)(this.spacePath, name);

      if (this.hasFile(name)) {
        (0, _fs.rmSync)(path);
      } else if (this.hasDir(name)) {
        (0, _fs.rmSync)(path, {
          recursive: true,
          force: true
        });
      }
    }
  }, {
    key: "path",
    get: function () {
      return this.spacePath;
    }
  }, {
    key: "encoding",
    get: function () {
      return {
        encoding: "utf-8"
      };
    }
  }]);

  return WorkSpace;
}();

exports.default = WorkSpace;