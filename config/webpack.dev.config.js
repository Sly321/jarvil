const path = require('path');
const webpackMerge = require('webpack-merge');
const {
	spawn
} = require('child_process');
const paths = require('./paths');
const webpackBaseConfig = require('./webpack.basic.config')

const port = 1112

module.exports = webpackMerge(webpackBaseConfig, {
	mode: "development",
	entry: {
		launcher: [
			// 'webpack/hot/only-dev-server',
			paths.launcherReact,
		],
		settings: [
			// 'webpack/hot/only-dev-server',
			paths.settingsReact,
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '..', "dist"),
		publicPath: 'http://127.0.0.1:1112/',
	},
	cache: true,
	devServer: {
		inline: true,
		lazy: false,
		contentBase: path.resolve(__dirname, '..', "dist"),
		publicPath: `http://localhost:${port}/build`,
		disableHostCheck: true, // do not use production
		historyApiFallback: true,
		clientLogLevel: 'info',
		quiet: true,
		// hot: true,
		port: 1112,
		before() {
			spawn('yarn', ['run-electron'], {
					shell: true,
					env: process.env,
					stdio: 'inherit'
				})
				.on('close', code => {
					console.log(`The Electron Process was closed.`)
					spawn("yarn", ["clean:electron"], {
						shell: true,
						env: process.env,
						stdio: 'inherit'
					}).on('close', (code) => {
						console.log(`Cleaned up the temporary JavaScript files.`)
						process.exit(code)
					})
				})
				.on('error', spawnError => console.error(spawnError));
		},
		after() {
			console.log(`webpack-dev-server is running at http://localhost:${port}`)
			console.log(`you can debug the applications launcher in your own browser:`)
			console.log(`- http://localhost:${port}/build/launcher.html`)
			console.log(`- http://localhost:${port}/build/settings.html`)
		},

	},
});