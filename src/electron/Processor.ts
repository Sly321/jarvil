import JarvilPlugin from "./plugins/JarvilPlugin"
import Logger from "./utils/Logger"

export interface ResultItem {
    title: string
    description: string
}

export default class Processor {
    constructor(private plugins: Array<JarvilPlugin>) { }

    public getResultItems(input: string): Array<ResultItem> {
        const result: Array<ResultItem> = []

        this.plugins.forEach(plugin => {

            try {
                const resultitems = plugin.getResultItems(input)
                result.push(...resultitems)
            } catch (e) {
                Logger.error(`Error while parsing the resultItems of ${plugin.name}:\n\t${e}`)
            }

        })

        return result
    }

    // TODO implement
    public executeAction(input: string): Promise<void> {
        console.log("Should Execute some Actions", input)

        return Promise.resolve()
    }
}