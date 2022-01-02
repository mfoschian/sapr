module.exports = {
	devServer: {
		host: 'sapr.protezionecivile.fvg.it'
	},
	publicPath: '/vue',
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: []
		}
	},
	chainWebpack: config => {
		config
			.module
			.rule("csv")
			.test(/\.csv$/)
			.use("csv-loader")
			.loader("csv-loader")
			.options({
				dynamicTyping: false,
				header: true,
				skipEmptyLines: true
			})
			.end();
	}
}
