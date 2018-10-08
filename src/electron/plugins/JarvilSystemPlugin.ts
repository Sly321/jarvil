import { ipcMain } from "electron"
import Events from "../Events"
import { ResultItem } from "../Processor"
import Logger from "../utils/Logger"
import JarvilPluginInterface from "./JarvilPluginInterface"
import { resolve } from "path"

export enum JarvilSystemPluginAction {
    Settings = "jarvil/settings",
    Close = "jarvil/close",
    Exit = "jarvil/exit",
    ReloadPlugins = "jarvil/reloadTheme"
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
            case JarvilSystemPluginAction.ReloadPlugins:
                ipcMain.emit(Events.ReloadPlugins)
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
                case JarvilSystemPluginAction.ReloadPlugins:
                    return [JarvilSystemPlugin.reloadPluginsResultItem]
                case JarvilSystemPluginAction.Close:
                case JarvilSystemPluginAction.Exit:
                    return [JarvilSystemPlugin.closeResultItem]
                default:
                    return [
                        JarvilSystemPlugin.settingsResultItem,
                        JarvilSystemPlugin.closeResultItem,
                        JarvilSystemPlugin.reloadPluginsResultItem
                    ]
            }

        } catch {
            return []
        }
    }

    private static get reloadPluginsResultItem(): ResultItem {
        return {
            ...this.createResultItem(),
            description: "Reload Plugins",
            actionId: JarvilSystemPluginAction.ReloadPlugins,
            image: resolve(__dirname, "jarvil-replay.svg")
        }
    }

    private static get settingsResultItem(): ResultItem {
        return {
            ...this.createResultItem(),
            description: "Open Settings",
            actionId: JarvilSystemPluginAction.Settings,
            image: resolve(__dirname, "jarvil-logo.svg")
        }
    }

    private static get closeResultItem(): ResultItem {
        return {
            ...this.createResultItem(),
            description: "Close Jarvil",
            actionId: JarvilSystemPluginAction.Close,
            image: resolve(__dirname, "jarvil-close.svg")
        }
    }

    private static createResultItem(): Pick<ResultItem, "title" | "name"> {
        return {
            title: "Jarvil",
            name: "jarvil-system-plugin"
        }
    }
}