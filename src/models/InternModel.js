const mongoose = require('mongoose');
const ObjectId= mongoose.Types.ObjectId


const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    collegeId: {
        type: ObjectId,
        ref: "newCollege",
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    
});

 module.exports = mongoose.model("newIntern",internSchema)
