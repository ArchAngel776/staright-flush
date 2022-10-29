"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

let Comment = /*#__PURE__*/function () {
  function Comment() {}

  _createClass(Comment, null, [{
    key: "block",
    value: function block(...lines) {
      return `/**\n${lines.map(line => `\t * ${line}`).join("\n")}\n\t */`;
    }
  }]);

  return Comment;
}();

exports.default = Comment;