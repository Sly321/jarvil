const Events = require("../../electron/Events.js")

document.getElementById("root").innerHTML = "ROOT TUT GUT<a href='https://google.com'>google</a>"
const btn = document.createElement("button")

btn.innerHTML = "Open Settings"

btn.onclick = () => {
	console.debug(`Event send: `, "open-settings")
	window.ipcRenderer.send("open-settings")
}

document.getElementById("root").appendChild(btn)