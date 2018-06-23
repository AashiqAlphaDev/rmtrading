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
		first_name: String,
		address: String,
		mobile_number: String,
		government_issued_id_type: String,
		government_issued_id: String
	}
});
userSchema.plugin(mongoosePaginate);
mongoose.model('User', userSchema);


//Vaccine Metadata
const vaccinesSchema = new Schema({
	name: String,
	available: Boolean,
	diseases: [ObjectID],
	pet_type: ObjectID,
	breed: ObjectID,
	gender: {
		for_male: Boolean,
		for_female: Boolean,
	},
	country: ObjectID,
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
	data: {}
});
;
vaccinesSchema.plugin(mongoosePaginate);
vaccinesSchema.pre("save", async function (next) {
	let Disease = mongoose.model("Disease");
	let diseases = await Disease.find({_id:{$in:this.diseases}});
	let PetType = mongoose.model("PetType");
	let pet_type = await PetType.findOne({_id: this.pet_type});
	let Country = mongoose.model("Country");
	let country = await Country.findOne({_id: this.country});
	this.data = {};
	this.data.diseases = _.map(diseases, (item)=>{return item.name});
	this.data.pet_type = pet_type.name;
	this.data.country = country.name;
	next();
});
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
			]
		}
	],
	data: {}
});

vaccinationCenterSchema.plugin(mongoosePaginate);
vaccinationCenterSchema.pre("save", async function (next) {
	let Country = mongoose.model("Country");
	let country = await Country.findOne({_id: this.address.country});
	this.data = {};
	this.data.country = country.name;
	next();
});
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

// Pets
var petSchema = new Schema({
	name: String,
	pet_type: ObjectID,
	breed: ObjectID,
	owner: ObjectID,
	date_of_birth: Date,
	chip_id: String
});
petSchema.plugin(mongoosePaginate);
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
	status: String,
	visit:ObjectID,
	data: {}
});
vaccinationSchema.plugin(mongoosePaginate);
vaccinationSchema.pre("save", async function (next) {
	let Vaccine = mongoose.model("Vaccine");
	let vaccine = await Vaccine.findOne({_id: this.vaccine});
	let Disease = mongoose.model("Disease");
	let disease = await Disease.findOne({_id: vaccine.disease});
	this.data = {};
	this.data.vaccine = vaccine.name;
	this.data.disease=disease.name;
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
	booking_time: [{
		to: Number,
		from: Number
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
	pet:ObjectID,
	biometrics_data:{}
});
mongoose.model('Visit', VisitSchema);


