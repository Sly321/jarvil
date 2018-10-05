const math = require('mathjs');
const path = require("path");
class Calculator {
    static get trigger() {
        return "";
    }
    static getResultItems(...args) {
        try {
            const result = math.eval(args.join(""));
            if (Number.isNaN(parseInt(result))) {
                return [];
            }
            return [{
                    title: "Calc",
                    description: result,
                    name: "calculator",
                    image: path.resolve(__dirname, "logo.svg")
                }];
        }
        catch (_a) {
            return [];
        }
    }
}
module.exports = Calculator;
