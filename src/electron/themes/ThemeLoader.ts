import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import FileSystem from "../utils/FileSystem"
import Logger from "../utils/Logger"
import Theme from "./Theme"

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
        Logger.info(`ThemeLoader.get::themesLocation`)
        const homeDirectory = FileSystem.getHomeDirectory()
        const resultDirectory = resolve(homeDirectory, "jarvil", "themes")

        if (!existsSync(resultDirectory)) {
            Logger.info(`ThemeLoader.get::themesLocation - no themes directory, creating it at: ${resultDirectory}`)
            FileSystem.MakeDirRecursively(resultDirectory)
            ThemeLoader.createInitialCss()
        }

        Logger.info(`ThemeLoader.get::themesLocation::return::${resultDirectory}`)
        return resultDirectory
    }

    private static createInitialCss(): void {
        writeFileSync(resolve(ThemeLoader.themesLocation, "default.css"), `.launcher {
            background: rgba(0, 0, 0, 0.5);
            color: white;
        }

        /* Input Component */
        .launcher input.search-input {
            font-size: 33px;
            background: transparent;
            outline: none;
            border: none;
            padding: 30px 18px;
            color: white;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Result List Warraper */
        .launcher ul.result-list {
            background: transparent;
        }

        /* Result List Items */
        .launcher ul.result-list li {
            color: white;
            font-size: 30px;
            /* padding: 15px; */
        }

        .launcher ul.result-list li.active {
            background-color: #ffffff5d;
        }`, "utf8")
    }
}