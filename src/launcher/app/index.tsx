import Events from "../../electron/Events"
import React from "react"

import "./index.scss"
import { render } from "react-dom"
import Launcher from "./Launcher"

render(<Launcher />, document.getElementById("root"))

const getEventBus = (): any => {
    return (window as any).ipcRenderer
}

console.log(getEventBus().sendSync("get.themes"))
// console.log(getEventBus().sendSync("process.input", "hallo"))

// document.getElementById("root").innerHTML = "ROOT TUT GUT<a href='https://google.com'>google</a>"


// const createBtn = (text: string, onClick: (this: HTMLElement, ev: MouseEvent) => any) => {
// 	const btn = document.createElement("button")
// 	btn.innerHTML = "Open Settings"
// 	btn.onclick = onClick
// 	return btn
// }

// document.getElementById("root").appendChild(createBtn("Open Settings", () => {
// 	getEventBus().send(Events.OpenSettings)
// }))

// document.getElementById("root").appendChild(createBtn("Console Dir Name", () => {
// 	console.log(getEventBus().sendSync("console-dir-name"))
// }))

// const createDiv = (className: string) => {
// 	const div = document.createElement("div")
// 	if (className) {
// 		div.className = className
// 	}
// 	return div
// }

// const div = createDiv("intro");
// const innerDiv = createDiv("container")
// innerDiv.appendChild(createDiv("j-letter-top"))
// innerDiv.appendChild(createDiv("j-letter-bottom"))
// innerDiv.appendChild(createDiv("a-letter-left"))
// innerDiv.appendChild(createDiv("a-letter-right"))
// innerDiv.appendChild(createDiv("a-letter-bridge-top"))
// innerDiv.appendChild(createDiv("a-letter-bridge-mid"))
// innerDiv.appendChild(createDiv("r-letter-left"))
// innerDiv.appendChild(createDiv("r-letter-top"))
// innerDiv.appendChild(createDiv("r-letter-mid"))
// innerDiv.appendChild(createDiv("r-letter-right"))
// innerDiv.appendChild(createDiv("r-letter-bottom-right"))
// innerDiv.appendChild(createDiv("v-letter-left"))
// innerDiv.appendChild(createDiv("v-letter-right"))
// innerDiv.appendChild(createDiv("i-letter"))
// innerDiv.appendChild(createDiv("s-letter-top"))
// innerDiv.appendChild(createDiv("s-letter-left"))
// innerDiv.appendChild(createDiv("s-letter-mid"))
// innerDiv.appendChild(createDiv("s-letter-right"))
// innerDiv.appendChild(createDiv("s-letter-bottom"))
// div.appendChild(innerDiv)
// document.getElementById("root").appendChild(div)