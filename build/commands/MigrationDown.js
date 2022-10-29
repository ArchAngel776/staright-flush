"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MigrationFilesPrint = _interopRequireDefault(require("../core/decorators/MigrationFilesPrint"));

var _MigrationExecutor2 = _interopRequireDefault(require("../core/foundations/MigrationExecutor"));

var _MigrationRevertingError = _interopRequireDefault(require("../exceptions/MigrationRevertingError"));

var _print = _interopRequireDefault(require("../core/hooks/print"));

var _Console = require("../core/data/enums/Console");

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let MigrationDown = (_dec = (0, _MigrationFilesPrint.default)("Below files will be reverted:"), (_class = (_class2 = /*#__PURE__*/function (_MigrationExecutor) {
  _inherits(MigrationDown, _MigrationExecutor);

  function MigrationDown() {
    return _MigrationExecutor.apply(this, arguments) || this;
  }

  _createClass(MigrationDown, [{
    key: "execute",
    value:
    /**
     * Custom statuses
     */
    async function execute() {
      for (const migration of this.migrations) {
        const importMigration = await Promise.resolve(`${this.path}/${migration}`).then(s => _interopRequireWildcard(require(s)));
        this.current = importMigration.default;

        if (!(await this.migrationManager.executeReverting(this.current))) {
          return MigrationDown.MIGRATION_REVERTING_ERROR;
        }

        (0, _print.default)(`Successful aplied migration: ${migration}`, _Console.Console.GREEN);
      }

      return MigrationDown.SUCCESS;
    }
  }, {
    key: "except",
    value: function except(status) {
      switch (status) {
        case MigrationDown.MIGRATION_REVERTING_ERROR:
          throw new _MigrationRevertingError.default(this.current.name);

        default:
          return _get(_getPrototypeOf(MigrationDown.prototype), "except", this).call(this, status);
      }
    }
  }]);

  return MigrationDown;
}(_MigrationExecutor2.default), _defineProperty(_class2, "MIGRATION_REVERTING_ERROR", -2), _class2), (_applyDecoratedDescriptor(_class.prototype, "execute", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "execute"), _class.prototype)), _class));
exports.default = MigrationDown;