"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDebug = exports.debug = exports.debugIndex = exports.debugLog = void 0;
exports.debugLog = [];
exports.debugIndex = 0;
function debug(msg, data) {
    exports.debugLog.push(`${exports.debugIndex} ${msg}`);
    exports.debugLog.push(JSON.stringify(data));
    exports.debugIndex++;
}
exports.debug = debug;
function resetDebug() {
    exports.debugLog = [];
    exports.debugIndex = 0;
}
exports.resetDebug = resetDebug;
//# sourceMappingURL=debug.js.map