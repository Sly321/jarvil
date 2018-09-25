const Events = require("../../electron/Events.js")

document.getElementById("root").innerHTML = "ROOT TUT GUT<a href='https://google.com'>google</a>"

const createBtn = (text, onClick) => {
	const btn = document.createElement("button")
	btn.innerHTML = "Open Settings"
	btn.onclick = onClick
	return btn
}


document.getElementById("root").appendChild(createBtn("Open Settings", () => {
	window.ipcRenderer.send("open-settings")
}))

document.getElementById("root").appendChild(createBtn("Console Dir Name", () => {
	console.log(window.ipcRenderer.sendSync("console-dir-name"))
}))