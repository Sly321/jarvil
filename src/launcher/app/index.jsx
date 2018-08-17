const Events = require("../../Events")

document.getElementById("root").innerHTML = "ROOT TUT GUT<a href='https://google.com'>google</a>"
const btn = document.createElement("button")

btn.innerHTML = "Open Settings"

btn.onclick = () => {
	window.ipcRenderer.send(Events.OpenSettings)
}

document.getElementById("root").appendChild(btn)