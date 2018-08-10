const mongoose = require('mongoose');
mongoose.connect('mongodb://db/ADDB');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectID = ObjectId = Schema.ObjectId;
const _ = require("underscore");

//User
const userSchema = new Schema({

	email: String,
	password: String,
	email_verified: Boolean,
	profile: {
		name: String,
		address: String,
		mobile_number: String,
		government_issued_id_type: String,
		government_issued_id: String,
		city:String
	}
});
userSchema.plugin(mongoosePaginate);
mongoose.model('User', userSchema);


//Vaccine Metadata
const vaccinesSchema = new Schema({
	name: String,
	available: Boolean,
	diseases: String,
	pet_type: ObjectID,
    pet: String,
	breed: ObjectID,
	gender: {
		for_male: Boolean,
		for_female: Boolean,
	},
	country: String,
	remarks: String,
	child_vaccine_schedules: [{
		catch_up_period: {
			notify_period: Number,
			due_period: Number
		},
		interval: Number,
		period: {
			start: Number,
			end: Number
		},
	}],
	adult_vaccine_schedules: [{
		catch_up_period: {
			notify_period: Number,
			due_period: Number
		},
		interval: Number,
		period: {
			start: Number,
			end: Number
		},
	}],
	booster_vaccine_schedules: [{
		catch_up_period: {
			notify_period: Number,
			due_period: Number
		},
		interval: Number,
		period: {
			start: Number,
			end: Number
		},
	}],
	data: {
		pet_type:String
	}
});
;
vaccinesSchema.plugin(mongoosePaginate);
mongoose.model('Vaccine', vaccinesSchema);

//Vaccination Centers
const vaccinationCenterSchema = new Schema({
	name: String,
	status: String,
	type: String,
	code: String,
	address: {
		city: String,
		country: String,
		state: String,
		address: String,
		address2: String,
		zip_code: String
	},
	contact: {
		name: String,
		phNo: String,
		email: String,
		fax: String
	},
	appointments_per_hour: Number,
	queues: [
		{
			name: String,
			time_slots: [
				{
					from: Number,
					to: Number
				}
			],
			days:[String]
		}
	],
	data: {}
});

vaccinationCenterSchema.plugin(mongoosePaginate);
mongoose.model('VaccinationCenter', vaccinationCenterSchema);

const vaccinationCenterAdminSchema = new Schema({
	email: String,
	status: String,
	vaccination_center: ObjectID
});
mongoose.model('VaccinationCenterAdmin', vaccinationCenterAdminSchema);

const vaccinationCenterStaffSchema = new Schema({
	email: String,
	status: String,
	vaccination_center: ObjectID
});
mongoose.model('VaccinationCenterStaff', vaccinationCenterStaffSchema);

var inventoryItemSchema = new Schema({
	name: String,
	desc: String
});
mongoose.model('InventoryItem', inventoryItemSchema);

//Pet Metadata
var breedSchema = new Schema({
	pet_type: ObjectID,
	name: String,
	life_span: {
		years: Number,
		months: Number
	}
});
breedSchema.plugin(mongoosePaginate);
mongoose.model('Breed', breedSchema);

var petTypeSchema = new Schema({
	name: String,
	description: String,
	scientific_name: String,
	life_span: Number,
	vaccination_fields: [{
		field_type: String,
		name: String
	}]
});
petTypeSchema.plugin(mongoosePaginate);
mongoose.model('PetType', petTypeSchema);

// pets
var petSchema = new Schema({
	name: String,
	pet_type: ObjectID,
	breed: ObjectID,
	owner: ObjectID,
	date_of_birth: Date,
	chip_id: String,
	data:{}
});
petSchema.plugin(mongoosePaginate);
petSchema.pre("save", async function (next) {
    this.data = {};
    if(this.breed) {
        let Breed = mongoose.model("Breed");
        let breed = await Breed.findOne({_id: this.breed});
        this.data.breed = breed.name;
    }

    let PetType = mongoose.model("PetType");
    let petType = await PetType.findOne({_id: this.pet_type});
    let Owner = mongoose.model("User");
    let owner = await Owner.findOne({_id: this.owner});
    this.data.pet_type = petType.name;
    this.data.owner_name = owner.profile.name;
    this.data.owner_mobile= owner.profile.mobile_number;
	this.data.owner_email= owner.email;
    next();
});
mongoose.model('Pet', petSchema);

var countriesSchema = new Schema({
	name: String
});
countriesSchema.plugin(mongoosePaginate);
mongoose.model('Country', countriesSchema);

var statesSchema = new Schema({
	name: String,
	country: ObjectID
});
statesSchema.plugin(mongoosePaginate);
mongoose.model('State', statesSchema);

// Vaccination

const vaccinationSchema = new Schema({
	dosage: {
		date: Date
	},
	dose:Number,
	catch_up_period: {
		start: Date,
		due_date: Date
	},
	pet: ObjectID,
	vaccine: ObjectID,
	disease:ObjectID,
	vialNo:String,
	status: { type: String, default:"Pending"},
	visit:ObjectID,
	data: {}
});
vaccinationSchema.plugin(mongoosePaginate);
vaccinationSchema.pre("save", async function (next) {
	let Vaccine = mongoose.model("Vaccine");
	let vaccine = await Vaccine.findOne({_id: this.vaccine});
	let Disease = mongoose.model("Disease");
	let diseases = await Disease.find({_id:{$in:vaccine.diseases}});
	this.data = {};
	this.data.vaccine = vaccine.name;
	this.data.disease=_.map(diseases, (disease)=>(disease.name))
	next();
});
mongoose.model('Vaccination', vaccinationSchema);


const DiseaseSchema = new Schema({
	name: String
});
mongoose.model('Disease', DiseaseSchema);

const TokenSchema = new Schema({
	status: String,
	pet: ObjectID
});
mongoose.model('Token', TokenSchema);

const RequestSchema = new Schema({
	title: String,
	desc: String,
	status: String,
	center: ObjectID
});
mongoose.model('Request', RequestSchema);


const CenterTypeSchema = new Schema({
	name: String
});
mongoose.model('CenterType', CenterTypeSchema);


const AppointmentSchema = new Schema({
	center: ObjectID,
	owner: ObjectID,
	date: Date,
	status: String,
	queue_name: String,
	slot_index: Number,
	bookie_details:{
		name:String,
		email:String,
		mobile:String
	},
	booking_time: [{
		to: String,
		from: String
	}]
});
mongoose.model('Appointment', AppointmentSchema);

const EmailVerificationSchema = new Schema({
	user: ObjectID,
	verified: Boolean
});
mongoose.model('EmailVerification', EmailVerificationSchema);



const VisitSchema = new Schema({
	user: ObjectID,
	vet_center:ObjectID,
	pet:ObjectID,
    pet_type:ObjectID,
	remarks:String,
	biometrics_data:{},
    data:{}

});
VisitSchema.pre("save", async function (next) {
    let VetCenter = mongoose.model("VaccinationCenter");
    let vetCenter = await VetCenter.findOne({_id: this.vet_center});
    this.data = {};
    this.data.vet_center = vetCenter.name;
    next();
});

mongoose.model('Visit', VisitSchema);



const ClaimSchema = new Schema({
	center_id:ObjectID,
	claimerDetails:{
		name:String,
		email:String,
		mobile:String
	},
	data:{}
});

mongoose.model('Claim',ClaimSchema);
ClaimSchema.pre("save", async function (next) {
    let VetCenter = mongoose.model("VaccinationCenter");
    let vetCenter = await VetCenter.findOne({_id: this.center_id});
    this.data = {};
    this.data.vet_center = vetCenter.name;
    next();
});




