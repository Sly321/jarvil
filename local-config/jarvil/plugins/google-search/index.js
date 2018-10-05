const opn = require("opn")

class GoogleSearchPlugin {
    static get trigger() {
        return "g"
    }

    static getResultItems(...args) {
        return [{
            title: "GoogleSearchPlugin",
            description: args.join(" "),
            name: "google-search"
        }]
    }

    static action(...input) {
        opn(`https://www.google.com/search?q=${input.join("+")}`)
    }
}

module.exports = GoogleSearchPlugin