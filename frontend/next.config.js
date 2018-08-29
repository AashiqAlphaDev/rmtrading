var path = require('path');


module.exports = {
	webpack: function (config) {
		config.resolve.alias = {
			'@components': path.resolve('./components'),
			'@config': path.resolve('./config'),
		};
		return config
	},
	exportPathMap:async function (defaultPathMap){
		return {

        }
	}
}
