import { existsSync, readdirSync, readFileSync } from "fs"
import { resolve, dirname } from "path"
import FileSystem from "../utils/FileSystem"
import { homedir } from "os"
import JarvilPlugin from "./JarvilPlugin"

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
            if (files.length === 1) {
                console.debug(`versuche plugin zu requiren: ${files[0]}`)
                const plugin = require(resolve(pluginFolder, files[0]))
                return [plugin]
            }
        }

        return []
    }

    private static get pluginFolder() {
        const homeDirectory = process.env.NODE_ENV === "development" ? resolve(dirname(require.main.filename), "..", "..", "local-config") : homedir()
        const resultDirectory = resolve(homeDirectory, "jarvil", "plugins")

        if (!existsSync(resultDirectory)) {
            FileSystem.MakeDirRecursively(resultDirectory)
        }

        return resultDirectory
    }
}