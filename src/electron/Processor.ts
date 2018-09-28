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

    public executeAction(pluginName: string, input: string): Promise<void> {
        console.log("Should Execute some Actions", input)

        const plugin = this.plugins.find(plugin => plugin.name === pluginName)

        if (!plugin) {
            Logger.error(`Could not find plugin: ${pluginName} to execute action goal on ${input}`)
        }

        plugin.action(input.substring(plugin.trigger.length + 1))

        return Promise.resolve()
    }
}