import Theme from "../themes/Theme"
import FileSystem from "../utils/FileSystem"
import { resolve } from "path"
import { existsSync, writeFileSync, readFileSync } from "fs"
import Logger from "../utils/Logger"


class Configuration {
    public selectedTheme: string
    public shortcutFocus: string
    public shortcutHide: string
}

export default class Preferences {
    private config: Configuration

    private jarvilConfigFilePath: string


    constructor() {
        const jarvilConfigDirectory = resolve(FileSystem.getHomeDirectory(), "jarvil")
        this.jarvilConfigFilePath = resolve(jarvilConfigDirectory, "preferences.json")

        if (!existsSync(this.jarvilConfigFilePath)) {
            this.createDefaultConfig
            this.writeConfig()
        } else {
            this.loadConfig()

        }
    }

    public get selectedTheme(): string {
        return this.config.selectedTheme
    }

    public set selectedTheme(theme: string) {
        this.config.selectedTheme = theme
        this.writeConfig()
    }

    public get shortcutFocus(): string {
        return this.config.shortcutFocus
    }

    public get shortcutHide(): string {
        return this.config.shortcutHide
    }

    private get createDefaultConfig(): Configuration {
        return this.config = {
            selectedTheme: "default",
            shortcutFocus: "Alt+Space",
            shortcutHide: "Esc"
        }
    }

    private loadConfig(): void {
        const str = readFileSync(this.jarvilConfigFilePath, "utf8")
        try {
            this.config = { ...this.createDefaultConfig, ...JSON.parse(str) }
        } catch (e) {
            Logger.error(`Error while parsing the content of ${this.jarvilConfigFilePath} to json:`, e)
        }
    }

    private writeConfig(): void {
        writeFileSync(this.jarvilConfigFilePath, JSON.stringify(this.config))
    }
}