import JarvilPluginInterface from "./plugins/JarvilPluginInterface"
import Logger from "./utils/Logger"

export interface ResultItem {
    title: string
    description: string
}

export default class Processor {
    constructor(private plugins: Array<JarvilPluginInterface>) { }

    public getResultItems(input: string): Array<ResultItem> {
        const result: Array<ResultItem> = []

        const triggerword = input.split(" ")[0]

        const triggeredPlugin = this.plugins.find(plugin => plugin.trigger === triggerword)

        if (triggeredPlugin) {
            return triggeredPlugin.getResultItems(this.getInputWithoutTrigger(input, triggeredPlugin))
        }

        this.plugins.forEach(plugin => {
            try {
                const resultitems = plugin.getResultItems(this.getInputWithoutTrigger(input, plugin))
                result.push(...resultitems)
            } catch (e) {
                Logger.error(`Error while parsing the resultItems of ${plugin.name}:\n\t${e}`)
            }
        })

        return result
    }

    public executeAction(pluginName: string, input: string): Promise<void> {
        Logger.info(`Processor - executeAction - ${pluginName} - input`)

        const plugin = this.plugins.find(plugin => plugin.name === pluginName)

        if (!plugin) {
            Logger.error(`Could not find plugin: ${pluginName} to execute action goal on ${input}`)
        }

        plugin.action(this.getInputWithoutTrigger(input, plugin))

        return Promise.resolve()
    }

    private getInputWithoutTrigger(input: string, plugin: JarvilPluginInterface) {
        return input.substring(plugin.trigger.length + 1)
    }
}