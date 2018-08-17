const {
	ipcMain
} = require("electron")
const createSettingsWindow = require("./settingsWindow")
const Events = require("./Events")

ipcMain.on(Events.OpenSettings, () => {
	console.debug(`angekommen`)
	createSettingsWindow()
})