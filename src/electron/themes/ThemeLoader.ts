import { existsSync, readdirSync, lstatSync, readFileSync } from "fs"
import Theme from "./Theme"
import { resolve, dirname } from "path"
import { homedir } from "os"
import FileSystem from "../utils/FileSystem"
import Logger from "../utils/Logger"

export class ThemeLoader {
    public static getThemes(): Array<Theme> {
        const themeFolder = ThemeLoader.themesLocation

        if (themeFolder) {
            const files = readdirSync(themeFolder)
            Logger.info("themes", themeFolder, files.length.toString(), files.toString())
            return files.map(file => {
                const name = file.slice(0, file.length - 4)
                Logger.info(`Successfully imported theme: ${name}`)
                return new Theme(name, readFileSync(resolve(themeFolder, file), "utf8"))
            })
        }

        return []
    }

    /**
     * Returns the %users home directory%/jarvil/themes in production mode.
     * In Development mode it returns %project-root%/local-config/jarvil/themes
     *
     * @private
     * @static
     * @returns {string}
     * @memberof ThemeLoader
     */
    private static get themesLocation(): string {
        const homeDirectory = FileSystem.getHomeDirectory()
        const resultDirectory = resolve(homeDirectory, "jarvil", "themes")

        if (!existsSync(resultDirectory)) {
            Logger.info(`ThemeLoader.get::themesLocation - no themes directory, creating it at: ${resultDirectory}`)
            FileSystem.MakeDirRecursively(resultDirectory)
        }

        return resultDirectory
    }
}