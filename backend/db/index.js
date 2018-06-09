const mongoose = require('mongoose');
mongoose.connect('mongodb://db/ADDB');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
const ObjectID = ObjectId = Schema.ObjectId;

//User
var userSchema = new Schema({
    name:String,
    email:String,
    password:String
});
mongoose.model('User', userSchema);

//Vaccine Metadata
var vaccinesSchema = new Schema({
    name: String,
    available:Boolean,
    related_disease:String,
    pet_kind:ObjectID,
    breed_type:ObjectID,
    gender:String,
    country:String,
    remarks:String,
    number_of_doses:Number,
    schedules:[{
        interval_from_birth:{
            weeks:Number,
            months:Number
        }
    }],
    recurring_interval:{
        weeks:Number,
        months:Number
    }
});
vaccinesSchema.plugin(mongoosePaginate);
mongoose.model('Vaccine', vaccinesSchema);



//Vaccination Centers
var vaccinationCenterSchema = new Schema({
    name:String,
    status:String,
    type:String,
    address:{
        city:String,
        country:String,
        state:String,
        address:String,
        address2:String,
        zip_code:String
    },
    contact:{
        name:String,
        phNo:String,
        email:String,
        fax:String
    }
});
vaccinationCenterSchema.plugin(mongoosePaginate);
mongoose.model('VaccinationCenter', vaccinationCenterSchema);

var vaccinationCenterAdminSchema = new Schema({
	email:String,
    status:String,
    vaccination_center:ObjectID
});
mongoose.model('VaccinationCenterAdmin', vaccinationCenterAdminSchema);

var vaccinationCenterStaffSchema = new Schema({
	email:String,
	status:String,
	vaccination_center:ObjectID
});
mongoose.model('VaccinationCenterStaff', vaccinationCenterStaffSchema);


var inventoryItemSchema = new Schema({
	name:String,
	desc:String
});
mongoose.model('InventoryItem', inventoryItemSchema);



//Pet Metadata
var breedSchema = new Schema({
    pet_type:ObjectID,
    name:String,
    life_span:{
        years:Number,
        months:Number
    }
});
breedSchema.plugin(mongoosePaginate);
mongoose.model('Breed', breedSchema);

var petTypeSchema = new Schema({
    name:String,
    description:String,
    scientific_name:String
});
petTypeSchema.plugin(mongoosePaginate);
mongoose.model('PetType', petTypeSchema);

// Pets
var petSchema = new Schema({
    name:String,
    pet_type:ObjectID,
    breed:ObjectID,
    owner:ObjectID
});
petSchema.plugin(mongoosePaginate);
mongoose.model('Pet', petSchema);


var countriesSchema = new Schema({
    name:String,
    states:[String]
});
countriesSchema.plugin(mongoosePaginate);
mongoose.model('Country', countriesSchema);


// Vaccination
var vaccinationSchema = new Schema({
    dosage:{
        date:Date
    },
    catch_up_period:{
        start:Date,
        due_date:Date
    },
    pet:ObjectID,
    vaccine:ObjectID,
    status:Boolean
});
vaccinationSchema.plugin(mongoosePaginate);
mongoose.model('Vaccination', vaccinationSchema);






var DiseaseSchema = new Schema({
    name:String
});
mongoose.model('Disease', DiseaseSchema);