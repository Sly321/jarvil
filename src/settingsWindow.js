// Modules to control application life and create native browser window
const {
	BrowserWindow
} = require('electron')
const paths = require('../config/paths');
const url = require('url');

/**
 * erstellt settings window
 *
 */
const createSettingsWindow = function (parent) {
	settingsWindow = new BrowserWindow({
		width: 800,
		height: 600,
		parent,
		modal: true,
		minimizable: false,
		maximizable: false
	})

	// and load the index.html of the app.
	// settingsWindow.loadFile('index.html')
	settingsWindow.loadURL(url.format({
		pathname: process.env.NODE_ENV === "development" ? paths.settingsIndex : paths.settingsTargetIndex,
		protocol: 'file:',
		slashes: true,
	}))

	settingsWindow.setMenuBarVisibility(false)

	// if (process.env.NODE_ENV === 'development') {
	// settingsWindow.webContents.openDevTools();
	//   }

	settingsWindow.on('closed', function () {
		settingsWindow = null
	})
}

module.exports = createSettingsWindow