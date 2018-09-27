class GoogleSearchPlugin {
    static get trigger() {
        return "g"
    }

    static getResultItems(...args) {
        return [{
            title: "GoogleSearchPlugin",
            description: args.join(" ")
        }]
    }
}

module.exports = GoogleSearchPlugin