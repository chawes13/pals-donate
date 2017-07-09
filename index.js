var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Fundraiser  = require('./models/fundraiser'),
    Donor       = require('./models/donor'),
    Campaign    = require('./models/campaign'),
    seed        = require('./seeds');

//DB Connection
var url = process.env.DATABASEURL || "mongodb://localhost/pals_fundraiser";
mongoose.connect(url, {useMongoClient: true});

//Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//testing only
seed();

var campaignYear = process.env.CAMPAIGNYEAR || new Date().getFullYear();

//===========
//  ROUTES
//===========
app.get("/", function(req, res){
   //TODO: make campaign global across all pages on start of application
   Campaign.findOne({year: campaignYear}, function(err, foundCampaign){
        if(err){
            console.log(err);
        } else {
            console.log("Found campaign: " + foundCampaign.year);
            Fundraiser.count({"campaign.$id": foundCampaign._id}, function(err, count){
               if(err){
                   console.log(err);
               } else {
                   //TODO: get top 10 fundraisers based on donor amounts
                   res.render("index", {campaign: foundCampaign, fundraiserCount: count });
               }
            });
        }
    });
});

//Fundraisers Index route
app.get("/fundraisers", function(req, res){
   Fundraiser.find({"campaign.year": campaignYear}, function(err, fundraisers){
       if(err){
           console.log(err);
       } else {
           res.render("fundraisers/index", {fundraisers: fundraisers});
       }
   });
});

//Fundraisers Create route
app.post("/fundraisers", function(req, res){
    //create fundraiser
    //make sure fundraiser doesn't exist with same id
});

//Fundraisers New route
app.get("/fundraisers/new", function(req, res){
   res.render("fundraisers/new"); 
});

//Fundraisers Show route
app.get("/fundraisers/:address", function(req, res){
   //locate
   res.render("fundraisers/show");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Keep calm and deploy PALS Fundraising on"); 
});