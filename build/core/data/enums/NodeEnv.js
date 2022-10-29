"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeEnv = void 0;
let NodeEnv;
exports.NodeEnv = NodeEnv;

(function (NodeEnv) {
  NodeEnv["DEV"] = "dev";
  NodeEnv["TEST"] = "test";
  NodeEnv["PROD"] = "prod";
})(NodeEnv || (exports.NodeEnv = NodeEnv = {}));