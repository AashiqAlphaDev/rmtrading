const routes = module.exports = require('next-routes')()
routes.add('/dashboard/pets/guardian-details/:guardian_id', '/dashboard/pets/guardian');
routes.add('/dashboard/pets/guardian-details/:guardian_id/pets/:pet_id','/dashboard/pets/pets');
routes.add('/dashboard/pets/guardian-details/:guardian_id/pets/:pet_id/visits/:visit_id','/dashboard/pets/visits');
routes.add('/user-dashboard/pets/:pet_id','/user-dashboard/pets');
routes.add('/book-appointment/:center_id/:date/:slot_index','/book-appointment');
routes.add('/book-appointment/:center_id/:date/:slot_index','/book-appointment');
routes.add('/super-admin-dashboard/app-data/pet-type/:pet_type_id','/super-admin-dashboard/app-data/pet-type/manage-pet-types');
routes.add('/super-admin-dashboard/vaccination-centers/:center_id','/super-admin-dashboard/vaccination-centers/manage-vaccination-centers');
routes.add('/super-admin-dashboard/vaccines/:vaccine_id','/super-admin-dashboard/vaccines/manage-vaccines');



