const {Schema,model} = require('mongoose');

const StaffSchema = Schema({
    name: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required: true
    },
    area: {
        type:String,
        required:true
    },
    project: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    role: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ],
});

module.exports = model("Staff",StaffSchema); 