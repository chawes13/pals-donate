var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    Fundraiser      = require('./models/fundraiser'),
    Donor           = require('./models/donor'),
    Campaign        = require('./models/campaign'),
    seed            = require('./seeds');

//DB Connection
var url = process.env.DATABASEURL || "mongodb://localhost/pals_fundraiser";
mongoose.connect(url, {useMongoClient: true});

//Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//testing only
seed();

//===========
//  ROUTES
//===========

//Index
app.get("/", function(req, res){
    Fundraiser.count({"campaign_id": campaign._id}, function(err, count){
       if(err){
           console.log(err);
       } else {
           //TODO: get top 10 fundraisers based on donor amounts
           res.render("index", {campaign: campaign, fundraiserCount: count });
       }
    });
});

//Fundraisers Index route
app.get("/fundraisers", function(req, res){
   Fundraiser.find({"campaign_id": campaign._id}, function(err, fundraisers){
       if(err){
           console.log(err);
       } else {
           res.render("fundraisers/index", {fundraisers: fundraisers});
       }
    });
});

//Fundraisers Create route
app.post("/fundraisers", function(req, res){
    req.body.fundraiser.campaign_id = campaign._id;
    Fundraiser.create(req.body.fundraiser, function(err, newFundraiser){
        if(err){
            console.log(err);
        } else{
            res.redirect("fundraisers/" + newFundraiser.pageAddress);
        }
    });
});

//Fundraisers New route
app.get("/fundraisers/new", function(req, res){
   res.render("fundraisers/new"); 
});

//Fundraisers Show route
app.get("/fundraisers/:address", function(req, res){
   Fundraiser.findOne({campaign_id: campaign._id, pageAddress: req.params.address}, function(err, fundraiser){
       if(err){
           console.log(err);
       } else if(fundraiser) {
           res.render("fundraisers/show", {fundraiser: fundraiser});
       } else {
           res.redirect("/notfound");
       }
   });
});

app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?"); 
});

var campaignYear = process.env.CAMPAIGNYEAR || new Date().getFullYear();
var campaign;

Campaign.findOne({year: campaignYear}, function(err, foundCampaign){
   if(err){
        console.log(err);
   } else{
        console.log("Found campaign: " + foundCampaign.year);
        campaign = foundCampaign;
        app.listen(process.env.PORT, process.env.IP, function(){
            console.log("Keep calm and deploy PALS Fundraising on");
        });
   }
});