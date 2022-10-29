"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CodeNeaster = _interopRequireDefault(require("./components/CodeNeaster"));

var _TemplateImportCreator = _interopRequireDefault(require("./components/TemplateImportCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Template = /*#__PURE__*/function () {
  function Template() {
    _defineProperty(this, "imports", void 0);

    _defineProperty(this, "params", void 0);

    this.imports = this.import();
    this.params = {};
  }

  _createClass(Template, [{
    key: "import",
    value: function _import() {
      return [];
    }
  }, {
    key: "addImport",
    value: function addImport(imp) {
      this.imports.push(imp);
      return this;
    }
  }, {
    key: "with",
    value: function _with(param, value) {
      this.params[param] = value;
      return this;
    }
  }, {
    key: "bindParams",
    value: function bindParams(content) {
      for (const param in this.params) {
        content = content.replaceAll(new RegExp(`@${param}`, "gm"), this.params[param]);
      }

      return content;
    }
  }, {
    key: "compileContent",
    value: function compileContent() {
      const content = this.content();
      return content instanceof Array ? new _CodeNeaster.default(content).compile() : content;
    }
  }, {
    key: "make",
    value: function make() {
      const imports = this.imports.map(_TemplateImportCreator.default.create).join("\n");
      return `${imports}\n\n${this.bindParams(this.compileContent())}`;
    }
  }]);

  return Template;
}();

exports.default = Template;