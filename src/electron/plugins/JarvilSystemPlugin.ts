import { ipcMain } from "electron"
import Events from "../Events"
import { ResultItem } from "../Processor"
import Logger from "../utils/Logger"
import JarvilPluginInterface from "./JarvilPluginInterface"
import { resolve } from "path"

export enum JarvilSystemPluginAction {
    Settings = "jarvil/settings",
    Close = "jarvil/close",
    Exit = "jarvil/exit"
}

export default class JarvilSystemPlugin implements JarvilPluginInterface {
    public name: string = "jarvil-system-plugin"
    public version: string = "1.0.0"
    public trigger: string = "jarvil"

    public action(actionId: string, ...args: Array<string>): void {
        Logger.info(`${this.name} - action triggered`, ...args)

        let action: string = null
        if (args.length >= 1) {
            action = args[0]
        }

        switch (actionId) {
            case JarvilSystemPluginAction.Settings:
                ipcMain.emit(Events.OpenSettings)
                break
            case JarvilSystemPluginAction.Close:
            case JarvilSystemPluginAction.Exit:
                process.exit()
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
        return {
            title: "Jarvil",
            description: "Open Settings",
            name: "jarvil-system-plugin",
            actionId: JarvilSystemPluginAction.Settings,
            image: resolve(__dirname, "jarvil-logo.svg"),
            preview: "<div style='background: black;'>Hey was geht</div>",
        }
    }

    private static get closeResultItem(): ResultItem {
        return {
            title: "Jarvil",
            description: "Close Jarvil",
            name: "jarvil-system-plugin",
            actionId: JarvilSystemPluginAction.Close,
            image: resolve(__dirname, "jarvil-close.svg")
        }
    }
}