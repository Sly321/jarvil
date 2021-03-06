const math = require('mathjs')
const path = require("path")
class Calculator {
    static get trigger(): string {
        return ""
    }

    static getResultItems(...args) {
        try {
            const result = math.eval(args.join(""))

            if (Number.isNaN(parseInt(result))) {
                return []
            }

            return [{
                title: result,
                description: "calculator",
                name: "calculator",
                image: path.resolve(__dirname, "logo.svg")
            }];
        } catch {
            return []
        }
    }
}

module.exports = Calculator