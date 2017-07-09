var mongoose    = require('mongoose'),
    donor       = require('./donor'),
    campaign    = require('./campaign');

var maxlength = [400, 'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

var fundraiserSchema = new mongoose.Schema({
    type: String,
    firstName: String,
    lastName: String,
    teamName: String,
    email: 
        {type: String, required: true},
    pageAddress:
        {type: String, required: true},
    goal: 
        {type: Number, min: [0, 'Goal cannot be negative']},
    pageDescription:
        {type: String, maxlength: maxlength},
    photoURL: String,
    videoURL: String,
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor"
    }],
    campaign: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign"
        },
        year: Number
    },
    created:
        {type: Date, default: Date.now()}
});

fundraiserSchema.index({ pageAddress: 1, campaign: 1 }, { unique: true });

module.exports = mongoose.model("Fundraiser", fundraiserSchema);