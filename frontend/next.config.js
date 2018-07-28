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
            '/user-dashboard/pets/:pet_id': {page: '/user-dashboard/pets'},
            '/book-appointment/:center_id/:date/:slot_index': {page: '/book-appointment'},
            '/super-admin-dashboard/app-data/pet-type/:pet_type_id': {page: '/super-admin-dashboard/app-data/pet-type/manage-pet-types'},
            '/super-admin-dashboard/vaccination-centers/:center_id': {page: '/super-admin-dashboard/vaccination-centers/manage-vaccination-centers'},
            '/super-admin-dashboard/vaccines/:vaccine_id': {page: '/super-admin-dashboard/vaccines/manage-vaccines'}
        }
	}
}


///book-appointment/5b2655b5ea48030011040252/7.24.2018/22