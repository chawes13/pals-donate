var mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
    fundraiser_id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: 
        {type: String, required: true},
    donationAmount: 
        {type: Number, min: [0, 'Donation cannot be negative']},
    lastDonated:
        {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Donor", donorSchema);