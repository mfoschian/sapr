module.exports = {
	devServer: {
		host: 'sapr.protezionecivile.fvg.it',
		proxy: {
			'^/reports' : {
				target: 'http://sapr.protezionecivile.fvg.it',
				ws: true,
				changeOrigin: true
			},
			'^/activities' : {
				target: 'http://sapr.protezionecivile.fvg.it',
				ws: true,
				changeOrigin: true
			},
			'^/missions' : {
				target: 'http://sapr.protezionecivile.fvg.it',
				ws: true,
				changeOrigin: true
			},
			'^/pilots' : {
				target: 'http://sapr.protezionecivile.fvg.it',
				ws: true,
				changeOrigin: true
			},
			'^/equipments' : {
				target: 'http://sapr.protezionecivile.fvg.it',
				ws: true,
				changeOrigin: true
			},
			'^/equipment_types' : {
				target: 'http://sapr.protezionecivile.fvg.it',
				ws: true,
				changeOrigin: true
			},
		}
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
