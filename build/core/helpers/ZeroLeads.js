"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _String = require("../data/enums/String");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

let ZeroLeads = /*#__PURE__*/function () {
  function ZeroLeads() {}

  _createClass(ZeroLeads, null, [{
    key: "format",
    value: function format(num, length) {
      const numString = num.toString().split(_String.String.EMPTY);

      while (numString.length < length) {
        numString.unshift("0");
      }

      return numString.join(_String.String.EMPTY);
    }
  }]);

  return ZeroLeads;
}();

exports.default = ZeroLeads;