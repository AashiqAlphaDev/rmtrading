var path = require('path');
const getRoutes = require('./routes');


module.exports = {
	webpack: function (config) {
		config.resolve.alias = {
			'@components': path.resolve('./components'),
			'@config': path.resolve('./config'),
		};
		return config
	},
    exportPathMap: getRoutes
}