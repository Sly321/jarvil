import { ipcMain, BrowserWindow } from "electron"
import createSettingsWindow from "./SettingsWindow"
import Events from "./Events"
import { ThemeLoader } from "./themes/ThemeLoader"
import PluginLoader from "./plugins/PluginLoader"
import Processor from "./Processor"
import Logger from "./utils/Logger"
import Preferences from "./preferences/Preferences"

export default class EventHandler {
    private processor: Processor

    constructor(private mainWindow: BrowserWindow) {
        const plugins = PluginLoader.getPlugins()
        this.processor = new Processor(plugins)
        this.registerListeners()
    }

    /**
     *
     *
     * @private
     * @memberof EventHandler
     */
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


        ipcMain.on(Events.ProcessInput, (event: Electron.Event, input: string) => {
            console.debug(Events.ProcessInput, input)

            const resultItems = this.processor.getResultItems(input)

            event.returnValue = resultItems
        })

        ipcMain.on("resize", (event: Electron.Event, width: number, height: number) => {
            this.mainWindow.setSize(width, height)
            console.debug(`resize: width: ${width}, height: ${height}`)
        })

        ipcMain.on(Events.ActionExecuted, (event: Electron.Event, pluginName: string, input: string) => {
            Logger.info(`Event: Events.ActionExecuted - Plugin: ${pluginName} - Input: ${input}`)
            this.processor.executeAction(pluginName, input)
        })

        /** Themes */

        ipcMain.on(Events.GetThemes, (event: Electron.Event) => {
            Logger.info(`Event: Events.GetThemes`)
            const themes = ThemeLoader.getThemes()
            event.returnValue = themes
        })

        ipcMain.on(Events.GetSelectedTheme, (event: Electron.Event) => {
            Logger.info(`Event: Events.GetSelectedTheme`)
            event.returnValue = Preferences.selectedTheme.name
        })
    }
}