import { app, BrowserWindow, Menu } from "electron"
import createSettingsWindow from "./SettingsWindow"
const paths = require('../../config/paths');
import url from "url"

import EventHandler from "./Eventing"

let mainWindow: Electron.BrowserWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        minWidth: 600,
        minHeight: 50,
        width: 600,
        height: 200,
        resizable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: false,
        closable: false,
        useContentSize: true,
        frame: false,
        transparent: true,
        fullscreenable: false
    })

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    mainWindow.loadURL(url.format({
        pathname: process.env.NODE_ENV === "development" ? paths.launcherIndex : paths.launcherTargetIndex,
        protocol: 'file:',
        slashes: true,
    }))

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow()
    if (mainWindow !== null) {
        new EventHandler(mainWindow)
    }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
        new EventHandler(mainWindow)
    }
})

module.exports = createSettingsWindow