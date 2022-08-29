"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 3000;
const server = (0, _express.default)();
server.get("/", (request, response) => {
  response.setHeader("content-type", "text/html;charset=utf-8");
  response.send("<h1>Foo</h1>");
});
server.listen(PORT, () => {
  console.log(`Server started at: ${PORT} port.`);
});
var _default = server;
exports.default = _default;