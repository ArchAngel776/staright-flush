"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = root;

var _String = require("../data/enums/String");

function root() {
  return require.main?.path || _String.String.EMPTY;
}