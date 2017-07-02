var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser');
    
//Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
   res.render("index"); 
});

//Fundraisers Index route
app.get("/fundraisers", function(req, res){
   res.render("fundraisers/index");
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
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Keep calm and deploy PALS Fundraising on"); 
});