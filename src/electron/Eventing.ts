import { ipcMain, BrowserWindow } from "electron"
import createSettingsWindow from "./SettingsWindow"
import Events from "./Events"
import { ThemeLoader } from "./themes/ThemeLoader"
import PluginLoader from "./plugins/PluginLoader"
import Processor, { ActionObject } from "./Processor"
import Logger from "./utils/Logger"
import Preferences from "./preferences/Preferences"
import Theme from "./themes/Theme"

export default class EventHandler {
    private processor: Processor
    private preferences: Preferences

    constructor(private mainWindow: BrowserWindow) {
        const plugins = PluginLoader.getPlugins()
        this.processor = new Processor(plugins)
        this.preferences = new Preferences()
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

        ipcMain.on("resize", (event: Electron.Event, { height, width }: { height: number, width: number }) => {
            const rect = this.mainWindow.getBounds()
            if (rect.height !== height) {
                Logger.info(`Event: Resize - width: ${width}, height: ${height}`)
                this.mainWindow.setSize(600, height)
            }
        })

        ipcMain.on(Events.ActionExecuted, (event: Electron.Event, actionObject: ActionObject) => {
            Logger.info(`Event: Events.ActionExecuted - Plugin: ${actionObject.name} - Input: ${actionObject.input} - ActionId: ${actionObject.actionId}`)
            this.processor.executeAction(actionObject)
        })

        /** Plugins */

        ipcMain.on(Events.GetPlugins, (event: Electron.Event) => {
            Logger.info(`Event: Events.GetPlugins`)
            const themes = this.processor.getPlugins()
            event.returnValue = themes
        })

        /** Themes */
        ipcMain.on(Events.GetThemes, (event: Electron.Event) => {
            Logger.info(`Event: Events.GetThemes`)
            const themes = ThemeLoader.getThemes()
            event.returnValue = themes
        })

        ipcMain.on(Events.GetSelectedTheme, (event: Electron.Event) => {
            Logger.info(`Event: Events.GetSelectedTheme`)
            const themes = ThemeLoader.getThemes()
            const selected = themes.find(theme => theme.name === this.preferences.selectedTheme)
            event.returnValue = selected || null
        })

        ipcMain.on(Events.SetSelectedTheme, (event: Electron.Event, theme: Theme) => {
            Logger.info(`Event: Events.SetSelectedTheme`)
            this.preferences.selectedTheme = theme.name

            // TODO, send event from 1 window to another. this works when triggered in main, but not in settings
            event.sender.send(Events.ReloadLauncherTheme)
        })
    }
}