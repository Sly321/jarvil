import { ipcMain, BrowserWindow } from "electron"
import createSettingsWindow from "./SettingsWindow"
import Events from "./Events"
import { ThemeLoader } from "./themes/ThemeLoader"
import PluginLoader from "./plugins/PluginLoader"
import Processor from "./Processor"
import Logger from "./utils/Logger"

export default class EventHandler {
    private processor: Processor

    constructor(private mainWindow: BrowserWindow) {
        const plugins = PluginLoader.getPlugins()
        this.processor = new Processor(plugins)
        this.registerListeners()
    }

    private registerListeners() {
        Logger.info("register the eventlisteners")
        ipcMain.on(Events.OpenSettings, () => {
            console.debug(`openSettings`)
            createSettingsWindow(this.mainWindow)
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

        ipcMain.on("get.plugins", (event: Electron.Event) => {
            console.debug(`get.themes - called`)

            const plugins = PluginLoader.getPlugins()

            console.debug(plugins)
            event.returnValue = plugins
        })

        ipcMain.on(Events.ProcessInput, (event: Electron.Event, input: string) => {
            console.debug(Events.ProcessInput, input)

            const resultItems = this.processor.getResultItems(input)

            event.returnValue = resultItems
        })
    }
}