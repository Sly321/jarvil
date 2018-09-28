const math = require('mathjs')
class Calculator {
    static get trigger(): string {
        return "c"
    }

    static getResultItems(...args) {
        try {
            const result = math.eval(args.join(""))

            if (Number.isNaN(parseInt(result))) {
                return []
            }

            return [{
                title: "Calc",
                description: result
            }];
        } catch {
            return []
        }
    }
}

module.exports = Calculator