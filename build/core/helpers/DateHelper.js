"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _String = require("../data/enums/String");

var _ZeroLeads = _interopRequireDefault(require("./ZeroLeads"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let DateHelper = /*#__PURE__*/function () {
  function DateHelper() {}

  _createClass(DateHelper, null, [{
    key: "formatLetter",
    value: function formatLetter(letter, date) {
      switch (letter) {
        case DateHelper.LETTER_SECOND:
          return _ZeroLeads.default.format(date.getSeconds(), 2);

        case DateHelper.LETTER_MINUTE:
          return _ZeroLeads.default.format(date.getMinutes(), 2);

        case DateHelper.LETTER_HOUR:
          return _ZeroLeads.default.format(date.getHours(), 2);

        case DateHelper.LETTER_DAY:
          return _ZeroLeads.default.format(date.getDate(), 2);

        case DateHelper.LETTER_MONTH:
          return _ZeroLeads.default.format(date.getMonth() + 1, 2);

        case DateHelper.LETTER_YEAR:
          return _ZeroLeads.default.format(date.getFullYear(), 4);

        default:
          return letter;
      }
    }
  }, {
    key: "format",
    value: function format(_format, date = new Date()) {
      return _format.split(_String.String.EMPTY).map(letter => DateHelper.formatLetter(letter, date)).join(_String.String.EMPTY);
    }
  }]);

  return DateHelper;
}();

exports.default = DateHelper;

_defineProperty(DateHelper, "LETTER_YEAR", "Y");

_defineProperty(DateHelper, "LETTER_MONTH", "m");

_defineProperty(DateHelper, "LETTER_DAY", "d");

_defineProperty(DateHelper, "LETTER_HOUR", "H");

_defineProperty(DateHelper, "LETTER_MINUTE", "i");

_defineProperty(DateHelper, "LETTER_SECOND", "s");