import { existsSync, readdirSync, lstatSync, readFileSync } from "fs"
import Theme from "./Theme"
import { resolve, dirname } from "path"
import { homedir } from "os"
import FileSystem from "../utils/FileSystem"

export class ThemeLoader {
    public static getThemes(): Array<Theme> {
        console.log("Dirname: ", __dirname)

        const themeFolder = ThemeLoader.getThemesLocation()
        let themes: Array<Theme> = []

        if (themeFolder) {
            console.debug(`readFilesSync on folder`, themeFolder)
            const files = readdirSync(themeFolder)
            themes = files.map(file => new Theme(file, readFileSync(resolve(themeFolder, file), "utf8")))
        }

        return themes
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
    private static getThemesLocation(): string {
        const homeDirectory = process.env.NODE_ENV === "development" ? resolve(dirname(require.main.filename), "..", "..", "local-config") : homedir()
        const resultDirectory = resolve(homeDirectory, "jarvil", "themes")

        if (!existsSync(resultDirectory)) {
            console.debug(`does not exists, i build ${resultDirectory}`)
            FileSystem.MakeDirRecursively(resultDirectory)
        }

        return resultDirectory
    }
}