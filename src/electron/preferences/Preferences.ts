import Theme from "../themes/Theme"
import FileSystem from "../utils/FileSystem"
import { resolve } from "path"
import { existsSync, writeFileSync } from "fs"

export default class Preferences {
    private config: { [key: string]: string }

    constructor() {
        const jarvilConfigDirectory = resolve(FileSystem.getHomeDirectory(), "jarvil")
        const jarvilConfigFilePath = resolve(jarvilConfigDirectory, "preferences.json")

        if (!existsSync(jarvilConfigFilePath)) {
            this.writeConfig()
        } else {
            // this load config
        }
    }

    public get selectedTheme(): Theme {
        const defaultTheme = new Theme("default", "")
        return defaultTheme
    }

    private get preferencesJson(): { [key: string]: string } {
        return {
            selectedTheme: this.selectedTheme.name
        }
    }

    private writeConfig(): void {
        const jarvilConfigFilePath = resolve(FileSystem.getHomeDirectory(), "jarvil", "preferences.json")
        writeFileSync(jarvilConfigFilePath, JSON.stringify(this.preferencesJson))
    }
}