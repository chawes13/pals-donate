var mongoose    = require('mongoose'),
    Donor       = require('./models/donor'),
    Campaign    = require('./models/campaign'),
    Fundraiser  = require('./models/fundraiser');
    
function seedDB(){
    Campaign.findOne({year: 2017}, function(err, foundCampaign){
        if(err){
            console.log(err);
        } else {
            var fundraisers = [
                {type: "individual", firstName: "Conor", lastName: "Hawes", email: "hawes.conor@gmail.com", pageAddress: "chawes", goal: 500, pageDescription: "Conor's Page", photoURL: "https://source.unsplash.com/W9OKrxBqiZA", campaign_id: foundCampaign._id},
                {type: "individual", firstName: "Sara", lastName: "Glass", email: "hawes.conor@gmail.com", pageAddress: "sglass", goal: 100, pageDescription: "Sara's Page", photoURL: "https://source.unsplash.com/EvcUtLF12XQ", campaign_id: foundCampaign._id},
                {type: "individual", firstName: "Jason", lastName: "Toff", email: "hawes.conor@gmail.com", pageAddress: "jtoff", goal: 1000, pageDescription: "Jason's Page", photoURL: "https://source.unsplash.com/1SAnrIxw5OY", campaign_id: foundCampaign._id}
            ];
             Donor.remove({}, function(err){
               if(err){
                   console.log(err);
               } else {
                   Fundraiser.remove({}, function(err){
                      if(err){
                          console.log(err);
                      } else{
                          addFundraisers(fundraisers);
                      }
                   });
               }
            });
        }
    });
}

function addFundraisers(fundraisers, cb){
    fundraisers.forEach(function(fundraiser){
        Fundraiser.create(fundraiser, function(err, newFundraiser){
            if(err){
                console.log(err);
            } else {
                console.log("Successfully created " +newFundraiser.firstName);
                addDonors(newFundraiser._id);
            }
        });
    });
}

function addDonors(id){
    var donors = [
        {fundraiser_id: id, firstName: "Michele", lastName: "Hawes", email: "test@gmail.com", donationAmount: 1000},
        {fundraiser_id: id, firstName: "Mike", lastName: "Hawes", email: "test@gmail.com", donationAmount: 1200},
        {fundraiser_id: id, firstName: "Casey", lastName: "Lower", email: "test@gmail.com", donationAmount: 20}
    ];
    
    donors.forEach(function(donor){
        Donor.create(donor, function(err, newDonor){
            if(err){
                console.log(err);
            }
        });
    });
}

//Not used currently
function createCampaign(){
    var campaignDetails = {
        year: 2017,
        goal: 100000,
        start: new Date(2017, 10, 01),
        end: new Date(2018, 04, 01)  
    };
    
    Campaign.create(campaignDetails, function(err, newCampaign){
        if(err){
            console.log(err);
        } else {
            console.log("Campaign created for " +newCampaign.year);
        }
    });

}

module.exports = seedDB;