import Theme from "../themes/Theme"
import FileSystem from "../utils/FileSystem"
import { resolve } from "path"
import { existsSync, writeFileSync, readFileSync } from "fs"
import Logger from "../utils/Logger"

export default class Preferences {
    private config: { selectedTheme: string }

    private jarvilConfigFilePath: string

    constructor() {
        const jarvilConfigDirectory = resolve(FileSystem.getHomeDirectory(), "jarvil")
        this.jarvilConfigFilePath = resolve(jarvilConfigDirectory, "preferences.json")

        if (!existsSync(this.jarvilConfigFilePath)) {
            this.createDefaultConfig()
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

    private createDefaultConfig() {
        this.config = {
            selectedTheme: "default"
        }
    }

    private loadConfig(): void {
        const str = readFileSync(this.jarvilConfigFilePath, "utf8")
        try {
            this.config = JSON.parse(str)
        } catch (e) {
            Logger.error(`Error while parsing the content of ${this.jarvilConfigFilePath} to json:`, e)
        }
    }

    private writeConfig(): void {
        writeFileSync(this.jarvilConfigFilePath, JSON.stringify(this.config))
    }
}