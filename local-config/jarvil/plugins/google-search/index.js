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
}

module.exports = GoogleSearchPlugin