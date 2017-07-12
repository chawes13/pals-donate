var mongoose    = require('mongoose'),
    donor       = require('./donor'),
    campaign    = require('./campaign');

var maxlength = [400, 'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

var fundraiserSchema = new mongoose.Schema({
    campaign_id: mongoose.Schema.Types.ObjectId,
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
    created:
        {type: Date, default: Date.now()}
});

fundraiserSchema.index({ pageAddress: 1, campaign_id: 1 }, { unique: true });

module.exports = mongoose.model("Fundraiser", fundraiserSchema);