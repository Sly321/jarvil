import { ipcMain } from "electron"
import createSettingsWindow from "./SettingsWindow"
import Events from "./Events"
import { resolve } from "path"
import { ThemeLoader } from "./themes/ThemeLoader"

ipcMain.on(Events.OpenSettings, () => {
    console.debug(`openSettings`)
    createSettingsWindow()
})

ipcMain.on(Events.ConsoleDirName, (event: Electron.Event) => {
    console.log(__dirname) // "E:\workspace\jarvil\dist\win-unpacked\resources\app.asar\src\electron"
    event.returnValue = __dirname
})

ipcMain.on("get.themes", (event: Electron.Event) => {
    console.debug(`get.themes - called`)

    const themes = ThemeLoader.getThemes()

    console.debug(themes)
    event.returnValue = themes
})

// settings