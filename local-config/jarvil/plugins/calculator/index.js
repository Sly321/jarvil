const math = require('mathjs');
class Calculator {
    static get trigger() {
        return "c";
    }
    static getResultItems(...args) {
        try {
            const result = math.eval(args.join(""));
            if (Number.isNaN(parseInt(result))) {
                return [];
            }
            return [{
                    title: "Calc",
                    description: result
                }];
        }
        catch (_a) {
            return [];
        }
    }
}
module.exports = Calculator;
