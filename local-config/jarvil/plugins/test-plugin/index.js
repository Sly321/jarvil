"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class TestPlugin {
    static get trigger() {
        return "c";
    }
    static getResultItems(...args) {
        let desc = "";
        let result = 0;
        let operation = null;
        args.forEach(arg => {
            const parsed = parseInt(arg);
            if (Number.isNaN(parsed)) {
                if (arg === "+") {
                    operation = "+";
                    return;
                }
            }
            if (parsed >= 0) {
                if (operation === "+") {
                    result += parsed;
                    operation = null;
                    return;
                }
                if (operation === null) {
                    result = parsed;
                }
            }
        });
        return [{
            title: "Test Plugin",
            description: desc + result
        }];
    }
}
module.exports = TestPlugin;