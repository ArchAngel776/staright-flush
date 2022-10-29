"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let TemplateImportCreator = /*#__PURE__*/function () {
  function TemplateImportCreator(data) {
    _defineProperty(this, "data", void 0);

    this.data = data;
  }

  _createClass(TemplateImportCreator, [{
    key: "createImportLine",
    value: function createImportLine() {
      const [path, fields, alias] = this.data;

      if (fields instanceof Array) {
        return this.templateFields(path, fields);
      } else if (fields === TemplateImportCreator.FIELDS_ALL && typeof alias !== "undefined") {
        return this.templateAlias(path, alias);
      }

      return this.templateDefault(path, fields);
    }
  }, {
    key: "templateFields",
    value: function templateFields(path, fields) {
      return `const { ${fields.join(", ")} } = require("${path}")`;
    }
  }, {
    key: "templateAlias",
    value: function templateAlias(path, alias) {
      return `const ${alias} = require("${path}")`;
    }
  }, {
    key: "templateDefault",
    value: function templateDefault(path, name) {
      return `const ${name} = require("${path}").default`;
    }
  }], [{
    key: "create",
    value: function create(data) {
      return new TemplateImportCreator(data).createImportLine();
    }
  }]);

  return TemplateImportCreator;
}();

exports.default = TemplateImportCreator;

_defineProperty(TemplateImportCreator, "FIELDS_ALL", "*");