import { ipcMain } from "electron"
import createSettingsWindow from "./SettingsWindow"
import Events from "./Events"

ipcMain.on(Events.OpenSettings, () => {
	console.debug(`openSettings`)
	createSettingsWindow()
})

ipcMain.on(Events.ConsoleDirName, (event: Electron.Event) => {
	console.log(__dirname) // "E:\workspace\jarvil\dist\win-unpacked\resources\app.asar\src\electron"
	event.returnValue = __dirname
})

// settings