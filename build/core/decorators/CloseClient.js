"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CloseClient;

function CloseClient(target, property, descriptor) {
  const method = descriptor.value;

  descriptor.value = async function (...args) {
    const result = await method.call(this, ...args);
    await this.client.close();
    return result;
  };
}