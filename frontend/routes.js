const routes = module.exports = require('next-routes')()
routes.add('/dashboard/pets/guardian-details/:guardian_id', '/dashboard/pets/guardian');
routes.add('/dashboard/pets/guardian-details/:guardian_id/pets/:pet_id','/dashboard/pets/pets');
routes.add('/dashboard/pets/guardian-details/:guardian_id/pets/:pet_id/visits/:visit_id','/dashboard/pets/visits');
routes.add('/user-dashboard/pets/:pet_id','/user-dashboard/pets');

