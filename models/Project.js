const {Schema,model} = require('mongoose');

const ProjectSchema = Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    technicalSkills:{
        type:String,
        required: true
    },
    status: {
        type: String,
        require: true,
        enum: ['accepted', 'rejected', 'inContact', 'waiting'],
        default: 'waiting',
    }
});

module.exports = model("Project",ProjectSchema); 
