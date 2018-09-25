const path = require('path')

const root = path.resolve(__dirname, "..")
const src = path.resolve(root, "src")
const jsOrTs = "ts"

const paths = {
	root: root,
	src: src,
	launcher: path.resolve(src, "launcher"),
	launcherIndex: path.resolve(src, "launcher", "index.html"),
	launcherReact: path.resolve(src, "launcher", "app", `index.${jsOrTs}x`),
	launcherTargetIndex: path.resolve(root, "dist", "launcher.html"),
	settings: path.resolve(src, "settings"),
	settingsIndex: path.resolve(src, "settings", "index.html"),
	settingsReact: path.resolve(src, "settings", "app", `index.${jsOrTs}x`),
}

module.exports = paths