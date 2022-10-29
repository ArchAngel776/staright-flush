"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _Comment = _interopRequireDefault(require("../core/helpers/Comment"));

var _root = _interopRequireDefault(require("../core/hooks/root"));

var _Migration = _interopRequireDefault(require("../core/Migration"));

var _Template2 = _interopRequireDefault(require("../core/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let MigrationTemplate = /*#__PURE__*/function (_Template) {
  _inherits(MigrationTemplate, _Template);

  function MigrationTemplate() {
    return _Template.apply(this, arguments) || this;
  }

  _createClass(MigrationTemplate, [{
    key: "import",
    value: function _import() {
      const migrationsPath = (0, _path.resolve)((0, _root.default)(), "migrations");
      const buildPath = (0, _path.resolve)((0, _root.default)(), "build", "core", "Migration");
      return [[(0, _path.relative)(migrationsPath, buildPath), _Migration.default.name]];
    }
  }, {
    key: "content",
    value: function content() {
      return ["module.exports = class @migration extends @base", [_Comment.default.block("@returns {boolean}"), "async apply()", ["return true"], "", _Comment.default.block("@returns {boolean}"), "async revert()", ["return true"]]];
    }
  }]);

  return MigrationTemplate;
}(_Template2.default);

exports.default = MigrationTemplate;

_defineProperty(MigrationTemplate, "PARAM_BASE", "base");

_defineProperty(MigrationTemplate, "PARAM_MIGRATION", "migration");