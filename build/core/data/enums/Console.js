"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = void 0;
let Console;
exports.Console = Console;

(function (Console) {
  Console["RED"] = "\x1B[31m";
  Console["YELLOW"] = "\x1B[33m";
  Console["GREEN"] = "\x1B[32m";
  Console["WHITE"] = "\x1B[37m";
})(Console || (exports.Console = Console = {}));