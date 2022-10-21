const {Schema,model} = require('mongoose');

const MaterialDonationSchema = Schema({
    personName:{
        type:String,
        required:true
    },
    donationName: {
        type: String,
        required:true,
    },
    description: {
        type:String,
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    project: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    status: {
        type: String,
        require: true,
        enum: ['accepted', 'rejected', 'inContact', 'waiting'],
        default: 'waiting',
    }
});

module.exports = model("MaterialDonation",MaterialDonationSchema); 