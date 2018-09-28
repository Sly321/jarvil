class Calculator {
    static get trigger(): string {
        return "c"
    }

    static getResultItems(...args) {
        let desc = ""
        let result = 0
        let operation = null

        args.forEach(arg => {
            const parsed = parseInt(arg)

            if (Number.isNaN(parsed)) {
                if (arg === "+") {
                    operation = "+"
                    return
                }
            }

            if (parsed >= 0) {
                if (operation === "+") {
                    result += parsed
                    operation = null
                    return
                }

                if (operation === null) {
                    result = parsed
                }

            }
        })

        desc = result.toString()



        return [{
            title: "Calculator",
            description: desc
        }]
    }
}

module.exports = Calculator