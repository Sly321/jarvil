const path = require('path')

const root = path.resolve(__dirname, "..")
const src = path.resolve(root, "src")
const jsxOrTsx = "jsx"

const paths = {
	root: root,
	src: src,
	launcher: path.resolve(src, "launcher"),
	launcherIndex: path.resolve(src, "launcher", "index.html"),
	launcherReact: path.resolve(src, "launcher", "app", `index.${jsxOrTsx}`),
	settings: path.resolve(src, "settings"),
	settingsIndex: path.resolve(src, "settings", "index.html"),
	settingsReact: path.resolve(src, "settings", "app", `index.${jsxOrTsx}`),
}

module.exports = paths