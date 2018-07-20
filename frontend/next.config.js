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
            '/dashboard/pets/guardian-details/:guardian_id': {page: '/dashboard/pets/guardian'},
            '/dashboard/pets/guardian-details/:guardian_id/pets/:pet_id': {page: '/dashboard/pets/pets'},
            '/dashboard/pets/guardian-details/:guardian_id/pets/:pet_id/visits/:visit_id': {page: '/dashboard/pets/visits'},
            '/user-dashboard/pets/:pet_id': {page: '/user-dashboard/pets'}

        }

	}
}