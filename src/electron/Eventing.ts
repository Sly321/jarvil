import { ipcMain } from "electron"
import createSettingsWindow from "./SettingsWindow"
import Events from "./Events"


console.debug(`Event registered: `, Events.OpenSettings)
ipcMain.on(Events.OpenSettings, () => {
	console.debug(`angekommen`)
	createSettingsWindow()
})