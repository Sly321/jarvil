const opn = require("opn")
const path = require("path")

class GoogleSearchPlugin {
    static get trigger() {
        return "g"
    }

    static get exact() {
        return true
    }

    static getResultItems(...args) {
        return [{
            title: "Google",
            description: args.join(" "),
            name: "google-search",
            actionId: "",
            image: path.resolve(__dirname, "google-logo.svg")
        }]
    }

    static action(actionId, ...input) {
        opn(`https://www.google.com/search?q=${input.join("+")}`)
    }
}

module.exports = GoogleSearchPlugin