import { existsSync, readdirSync, readFileSync, lstatSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import FileSystem, { FileType } from "../utils/FileSystem"
import { homedir } from "os"
import JarvilPlugin from "./JarvilPlugin"
import Logger from "../utils/Logger"

import ts, { ModuleKind, ModuleResolutionKind } from "typescript"
import JarvilSystemPlugin from "./JarvilSystemPlugin"
import JarvilPluginInterface from "./JarvilPluginInterface"

type PluginPackageJson = {
    main: string
    version: string
    name: string
}

const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2016,
    // lib: ["es6", "esnext"],
    module: ModuleKind.CommonJS, //AMD
    moduleResolution: ModuleResolutionKind.NodeJs
}

/**
 *
 *
 * @export
 * @class PluginLoader
 */
export default class PluginLoader {

    /**
     *
     *
     * @static
     * @returns {Array<JarvilPlugin>}
     * @memberof PluginLoader
     */
    public static getPlugins(): Array<JarvilPluginInterface> {
        const pluginFolder = PluginLoader.pluginFolder
        const result: Array<JarvilPluginInterface> = [new JarvilSystemPlugin()]

        // Read all Files and Folders inside the plugin directory
        const filesOrFolders = readdirSync(pluginFolder)

        Logger.info("Files and Folders", filesOrFolders.toString())

        filesOrFolders.forEach(fileOrFolder => {
            const possiblePluginDirectory = resolve(pluginFolder, fileOrFolder)
            const pluginDirectoryStat = lstatSync(possiblePluginDirectory)

            // If the PluginDirectory, is not a directory, run
            if (!pluginDirectoryStat.isDirectory()) {
                Logger.warn(`The file:\n\t- ${possiblePluginDirectory}\nis not in a dedicated plugin directory, please put it inside a separate directory and add a package.json.`)
                return
            }

            const packageJson = PluginLoader.getPackageJson(possiblePluginDirectory)

            // If the package.json is missing, run
            if (!packageJson) {
                return
            }

            const pluginIndexPath = resolve(possiblePluginDirectory, packageJson.main)

            let importedClass: any = null
            // If the defined main file in the package.json, is not a file, run
            if (!lstatSync(pluginIndexPath).isFile()) {
                Logger.warn(`The defined main in the package.json:\n\t- ${pluginIndexPath}\ndoes not exist.`)
            }

            const type = FileSystem.getFileType(pluginIndexPath)

            // File type
            if (type === FileType.JavaScript) {
                try {
                    importedClass = require(resolve(pluginFolder, pluginIndexPath))
                } catch (e) {
                    Logger.error(`Problem while importing plugin ${pluginIndexPath}, exception:\n${e}`)
                    return
                }
            } else if (type === FileType.TypeScript) {
                const outputPath = pluginIndexPath.replace(".ts", ".js")
                const host = ts.createCompilerHost({})
                const fileInput = host.readFile(pluginIndexPath)
                const trans = ts.transpileModule(fileInput, { compilerOptions: options })
                writeFileSync(outputPath, trans.outputText)

                if (!existsSync(outputPath)) {
                    Logger.warn(`Error while transpiling the TypeScript file:\n\t${pluginIndexPath}`)
                    return
                }

                try {
                    importedClass = require(outputPath)
                } catch (e) {
                    Logger.error(`Problem while importing plugin ${pluginIndexPath}, exception:\n${e}`)
                    return
                }
            } else {
                Logger.warn(`Unknown filetype in:\n\t- ${pluginIndexPath}\nwhile loading the plugin.\nSupported filetypes are .js | .ts`)
                return
            }

            const { name, version } = packageJson
            const plugin = new JarvilPlugin(name, version, importedClass.trigger, importedClass.getResultItems, importedClass.action)
            result.push(plugin)
            Logger.info(`Successfully imported plugin: ${plugin.name}:${plugin.version}`)
        })

        return result
    }

    /**
     * Returns the package.json file of a specific directory and checks if the package.json has the required fields.
     * Requiered fiels are "main", "version" and "name". If one of the fields is missing, or the package.json does not
     * exists, the return value will be null. In the other case the package.json object will be returned.
     *
     * @private
     * @static
     * @param {string} pluginDirectory the directory where the package.json should be
     * @returns {(PluginPackageJson | null)} the package.json object if the file exists and has the requiered fields
     * @memberof PluginLoader
     */
    private static getPackageJson(pluginDirectory: string): PluginPackageJson | null {
        const packageJsonPath = resolve(pluginDirectory, "package.json")

        if (!existsSync(packageJsonPath)) {
            Logger.warn(`The package.json:\n\t- ${packageJsonPath}\ndoes not exist.`)
            return null
        }

        const packageJsonStat = lstatSync(packageJsonPath)

        if (!packageJsonStat.isFile()) {
            Logger.warn(`The package.json:\n\t- ${packageJsonPath}\nis not a file.`)
            return null
        }

        const packageJson = require(packageJsonPath)

        if (!PluginLoader.hasRequiredPluginFields(packageJson, packageJsonPath)) {
            return null
        }

        return packageJson
    }

    private static hasRequiredPluginFields(packageJson: any, path: string): packageJson is PluginPackageJson {
        if (!Object.prototype.hasOwnProperty.call(packageJson, "main")) {
            Logger.warn(`The package.json file:\n\t- ${path}\nhas no entry for "main", add it if you want your plugin to be loaded.`)
            return false
        }

        if (!Object.prototype.hasOwnProperty.call(packageJson, "version")) {
            Logger.warn(`The package.json file:\n\t- ${path}\nhas no entry for "version", add it if you want your plugin to be loaded.`)
            return false
        }

        if (!Object.prototype.hasOwnProperty.call(packageJson, "name")) {
            Logger.warn(`The package.json file:\n\t- ${path}\nhas no entry for "name", add it if you want your plugin to be loaded.`)
            return false
        }

        return true
    }

    private static get pluginFolder() {
        const homeDirectory = FileSystem.getHomeDirectory()
        const resultDirectory = resolve(homeDirectory, "jarvil", "plugins")

        if (!existsSync(resultDirectory)) {
            Logger.info(`PluginLoader.get::pluginFolder - no plugin directory, creating it at: ${resultDirectory}`)
            FileSystem.MakeDirRecursively(resultDirectory)
        }

        return resultDirectory
    }
}