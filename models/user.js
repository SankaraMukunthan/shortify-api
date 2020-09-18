const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: {type:String, lowercase:true, required:true, unique:true},
    pwd: { type: String, required:true}

});

userSchema.pre('save',async function () {
    if(this.isModified || this.isNew){
        const salt =await bcryptjs.genSalt();
        const hash =await bcryptjs.hash(this.pwd, salt);
        this.pwd= hash;
    }
})

module.exports = mongoose.model('user', userSchema);