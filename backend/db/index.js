const mongoose = require('mongoose');
mongoose.connect('mongodb://db/ADDB');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectID = ObjectId = Schema.ObjectId;

//User
const userSchema = new Schema({
    email:String,
    password:String,
    email_verified:Boolean,
    profile:{
	    first_name:String,
	    last_name:String,
	    address:String,
	    mobile_number:String,
	    government_issued_id_type:String,
	    government_issued_id:String
    }
});
userSchema.plugin(mongoosePaginate);
mongoose.model('User', userSchema);


//Vaccine Metadata
const vaccinesSchema = new Schema({
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
const vaccinationCenterSchema = new Schema({
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

const vaccinationCenterAdminSchema = new Schema({
	email:String,
    status:String,
    vaccination_center:ObjectID
});
mongoose.model('VaccinationCenterAdmin', vaccinationCenterAdminSchema);

const vaccinationCenterStaffSchema = new Schema({
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
const vaccinationSchema = new Schema({
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

const DiseaseSchema = new Schema({
    name:String
});
mongoose.model('Disease', DiseaseSchema);