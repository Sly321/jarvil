import { ipcMain } from "electron"
import Events from "../Events"
import { ResultItem } from "../Processor"
import Logger from "../utils/Logger"
import JarvilPluginInterface from "./JarvilPluginInterface"

export enum JarvilSystemPluginAction {
    Settings = "settings",
    Close = "close",
    Exit = "exit"
}

export default class JarvilSystemPlugin implements JarvilPluginInterface {
    public name: string = "jarvil-system-plugin"
    public version: string = "1.0.0"
    public trigger: string = "jarvil"

    public action(...args: Array<string>): void {
        Logger.info(`${this.name} - action triggered`, ...args)

        let action: string = null
        if (args.length >= 1) {
            action = args[0]
        }

        switch (action) {
            case JarvilSystemPluginAction.Settings:
                ipcMain.emit(Events.OpenSettings)
            default:
                break
        }
    }

    /**
     *
     *
     * @static
     * @param {...Array<string>} args
     * @returns
     * @memberof JarvilSystemPlugin
     */
    public getResultItems(...args: Array<string>): Array<ResultItem> {
        try {

            let action: string = null
            if (args.length >= 1) {
                action = args[0]
            }

            switch (action) {
                case JarvilSystemPluginAction.Settings:
                    return [JarvilSystemPlugin.settingsResultItem]
                case JarvilSystemPluginAction.Close:
                case JarvilSystemPluginAction.Exit:
                    return [JarvilSystemPlugin.closeResultItem]
                default:
                    return [
                        JarvilSystemPlugin.settingsResultItem,
                        JarvilSystemPlugin.closeResultItem
                    ]
            }

        } catch {
            return []
        }
    }

    private static get settingsResultItem(): ResultItem {
        return { title: "Jarvil", description: "Open Settings" }
    }

    private static get closeResultItem(): ResultItem {
        return { title: "Jarvil", description: "Close Jarvil" }
    }
}