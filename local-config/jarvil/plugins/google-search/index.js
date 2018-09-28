const opn = require("opn")

class GoogleSearchPlugin {
    static get trigger() {
        return "g"
    }

    static getResultItems(...args) {
        console.debug(`GoogleSearchPlugin`, "eingabe")
        return [{
            title: "GoogleSearchPlugin",
            description: args.join(" ")
        }]
    }

    static action(...input) {
        opn(`https://www.google.com/search?q=${input.join("+")}`)
    }
}

module.exports = GoogleSearchPlugin