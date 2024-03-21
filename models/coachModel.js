//coachModel
const mongoose = require("mongoose");
const coachSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: {
            type: String
        },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        subscribe: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    { timestamps: true }
);



const Coach = mongoose.model("Coach", coachSchema);


module.exports = Coach;