"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = print;

var _Console = require("../data/enums/Console");

var _String = require("../data/enums/String");

function print(message = _String.String.EMPTY, color = _Console.Console.WHITE) {
  console.log(color, message);
}