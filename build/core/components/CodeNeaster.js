"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let CodeNeaster = /*#__PURE__*/function () {
  function CodeNeaster(codeParts) {
    _defineProperty(this, "codeParts", void 0);

    this.codeParts = codeParts;
  }

  _createClass(CodeNeaster, [{
    key: "compileParts",
    value: function compileParts(parts, tabulator = 0) {
      const result = [];

      for (const part of parts) {
        if (part instanceof Array) {
          result.push(...[this.tabLine(CodeNeaster.CODE_OPEN, tabulator), ...this.compileParts(part, tabulator + 1), this.tabLine(CodeNeaster.CODE_CLOSE, tabulator)]);
        } else {
          result.push(this.tabLine(part, tabulator));
        }
      }

      return result;
    }
  }, {
    key: "tabLine",
    value: function tabLine(line, tabulation) {
      return `${CodeNeaster.TAB.repeat(tabulation)}${line}`;
    }
  }, {
    key: "compile",
    value: function compile() {
      return this.compileParts(this.codeParts).join(CodeNeaster.CODE_LINE);
    }
  }]);

  return CodeNeaster;
}();

exports.default = CodeNeaster;

_defineProperty(CodeNeaster, "TAB", "\t");

_defineProperty(CodeNeaster, "CODE_OPEN", "{");

_defineProperty(CodeNeaster, "CODE_CLOSE", "}");

_defineProperty(CodeNeaster, "CODE_LINE", "\n");