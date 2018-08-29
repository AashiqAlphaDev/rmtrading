const mongoose = require('mongoose');
mongoose.connect('mongodb://db/loop');
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
		mobile_number: String,
	},
    location:{
        city:String,
        state:String,
        address: String,
        country:String
    },
	following:[ObjectID],
	followers:[ObjectID]
});
userSchema.plugin(mongoosePaginate);
userSchema.pre("save", async function (next) {
    next();
});
mongoose.model('User', userSchema);



const tagSchema = new Schema({
    name:String,
    is_user_tag:Boolean
});
tagSchema.plugin(mongoosePaginate);
mongoose.model('Tag', tagSchema);




const categorySchema = new Schema({
    title: String,
    description: String,
    tags:[ObjectID],
	data:{}
});
categorySchema.plugin(mongoosePaginate);
categorySchema.pre("save", async function (next) {
    next();
});
mongoose.model('Category', categorySchema);


const linkSchema = new Schema({
    url:String,
    category:[ObjectId],
    user:ObjectID,
    is_public:String,
    title:String,
    description:String,
    images:[String]
});
linkSchema.plugin(mongoosePaginate);
mongoose.model('Link', linkSchema);






















