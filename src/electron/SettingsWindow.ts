import { BrowserWindow } from "electron"
const paths = require('../../config/paths')
import url from "url"

export let SettingsWindow: BrowserWindow

/**
 * erstellt settings window
 *
 */
const createSettingsWindow = function (parent?: BrowserWindow) {
	SettingsWindow = new BrowserWindow({
		width: 800,
		height: 600,
		parent,
		modal: true,
		minimizable: false,
		maximizable: false
	})

	// and load the index.html of the app.
	// SettingsWindow.loadFile('index.html')
	SettingsWindow.loadURL(url.format({
		pathname: process.env.NODE_ENV === "development" ? paths.settingsIndex : paths.settingsTargetIndex,
		protocol: 'file:',
		slashes: true,
	}))

	SettingsWindow.setMenuBarVisibility(false)

	// if (process.env.NODE_ENV === 'development') {
	// SettingsWindow.webContents.openDevTools();
	//   }

	SettingsWindow.on('closed', function () {
		SettingsWindow = null
	})
}

export default createSettingsWindow