const mongoose = require('mongoose');
const studentsSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        index: true
    },
    age: { 
        type: Number,
        required: true
    },
    email: { type: String, required: true},
    phone: { type: String, required: true},
    courses:[
        {
            name: { type: String },
            fee: { type: Number }
        }
    ],
    deleted: { type: Boolean }
}, {timestamps: true, versionKey: 'version'});

//Middle-ware to update version
studentsSchema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    if (update.version != null) {
        delete update.version;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key].version != null) {
            delete update[key].version;
            if (Object.keys(update[key]).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.version = 1;
});
const Student = mongoose.model("Student", studentsSchema, "students");
module.exports = Student;