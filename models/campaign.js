var mongoose = require('mongoose');
var Fundraiser = require('./fundraiser');
var moment = require('moment');

var campaignSchema = new mongoose.Schema({
    year: 
        {type: Number, index: true},
    goal: Number,
    start: Date,
    end: Date
});

campaignSchema.methods.totalFundraisers = function totalFundraisers() {
    Fundraiser.count({campaign_id: this._id}, function(err, count){
       if(err){
           console.log(err);
       } else {
           return count;
       }
    });
};

campaignSchema.methods.fundraisers = function fundraisers(cb){
    return Fundraiser.find({ campaign_id: this._id}, cb);
};

campaignSchema.methods.daysLeft = function daysLeft() {
    var days = moment(this.end).diff(Date.now(), 'days');
    return days < 0 ? 0 : days;
};

module.exports = mongoose.model("Campaign", campaignSchema);