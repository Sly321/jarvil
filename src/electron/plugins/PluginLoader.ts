import { existsSync, readdirSync, readFileSync } from "fs"
import { resolve, dirname } from "path"
import FileSystem from "../utils/FileSystem"
import { homedir } from "os"
import JarvilPlugin from "./JarvilPlugin"
import Logger from "../utils/Logger"

/**
 *
 *
 * @export
 * @class PluginLoader
 */
export default class PluginLoader {

    public static getPlugins(): Array<JarvilPlugin> {
        const pluginFolder = PluginLoader.pluginFolder

        if (pluginFolder) {
            const files = readdirSync(pluginFolder)
            return files.map(file => {
                const plugin = require(resolve(pluginFolder, file))
                // TODO is JS or TS, Compile TS
                // TODO isPlugin () else fehlermeldung to logger
                return plugin
            })
        }

        return []
    }

    private static get pluginFolder() {
        const homeDirectory = process.env.NODE_ENV === "development" ? resolve(dirname(require.main.filename), "..", "..", "local-config") : homedir()
        const resultDirectory = resolve(homeDirectory, "jarvil", "plugins")

        if (!existsSync(resultDirectory)) {
            Logger.info(`PluginLoader.get::pluginFolder - no plugin directory, creating it at: ${resultDirectory}`)
            FileSystem.MakeDirRecursively(resultDirectory)
        }

        return resultDirectory
    }
}