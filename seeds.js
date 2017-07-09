var mongoose    = require('mongoose'),
    Donor       = require('./models/donor'),
    Campaign    = require('./models/campaign'),
    Fundraiser  = require('./models/fundraiser');
    
// var campaignDetails = {
//     year: 2017,
//     goal: 100000,
//     start: new Date(2017, 10, 01),
//     end: new Date(2018, 04, 01)  
// };

// var campaign = Campaign.create(campaignDetails, function(err, newCampaign){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Campaign created for " +newCampaign.year);
//     }
// });

function seedDB(){
    Campaign.findOne({year: 2017}, function(err, foundCampaign){
        if(err){
            console.log(err);
        } else {
            var fundraisers = [
                {type: "individual", firstName: "Conor", lastName: "Hawes", email: "hawes.conor@gmail.com", pageAddress: "chawes", goal: 500, pageDescription: "Conor's Page", photoURL: "https://source.unsplash.com/W9OKrxBqiZA", campaign: foundCampaign},
                {type: "individual", firstName: "Sara", lastName: "Glass", email: "hawes.conor@gmail.com", pageAddress: "sglass", goal: 100, pageDescription: "Sara's Page", photoURL: "https://source.unsplash.com/EvcUtLF12XQ", campaign: foundCampaign},
                {type: "individual", firstName: "Jason", lastName: "Toff", email: "hawes.conor@gmail.com", pageAddress: "jtoff", goal: 1000, pageDescription: "Jason's Page", photoURL: "https://source.unsplash.com/1SAnrIxw5OY", campaign: foundCampaign}
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
    fundraisers.forEach(function(fundraiser, index){
        Fundraiser.create(fundraiser, function(err, newFundraiser){
            if(err){
                console.log(err);
            } else {
                console.log("Successfully created " +newFundraiser.firstName);
            }
        });
    });
}

module.exports = seedDB;