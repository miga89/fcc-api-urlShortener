var express = require("express");
var u = require("url");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //use mongoose with ES6 promises

app.use(express.static(__dirname));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create a mongoose schema
var urlSchema = mongoose.Schema({
    targetURL: String,
    shortURL: String
});

// create a mongoose model
var urlModel = mongoose.model('url', urlSchema);



 /* serves main page */
 app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });



function formatNumber(str) {
    return ('000'+str).substring(str.length);
}

function validURL(str){
    var url_pattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
    return url_pattern.test(str);
}
// // /* api post and get routes */
app.get('/new/:targetURL(*)', async (req, res) => {
    var targetURL = req.params.targetURL;

    if (!validURL(targetURL))
    {
        res.end("Please enter a valid URL with the following format: www.domainname.domain");
    }

    // check database to see if targetURL was already saved
    var url = await urlModel.findOne({targetURL: targetURL});
    // if url=null returned (no entry found), create new database entry
    if (!url){
        var numberOfEntries = await  urlModel.count() ;
        var url = new urlModel({targetURL:targetURL, shortURL: formatNumber(numberOfEntries + 1) });
        await url.save();
        res.json({original_url: url.targetURL, short_url: process.env.HOST + url.shortURL});
    } else{
        res.json({original_url: url.targetURL, short_url: process.env.HOST + url.shortURL});
    }
 });


// if shortened URL is passed, redirect user to target website
app.get('/:shortID(*)', async function(req,res){
    var shortID = req.params.shortID;
    // check if shortURL is in database and redirect if found
    var url = await urlModel.findOne({shortURL: shortID});
    if (!url) {
        res.end("Error. Your shortened URL is not in our database!");
    } else{
        res.redirect("https://"+url.targetURL);

    }

});

app.post('/sub', async (req,res) => {
    var targetURL = req.body.targetURL;


     if (!validURL(targetURL))
    {
        res.end("Please enter a valid URL with the following format: www.domainname.domain");
    }
    // check database to see if targetURL was already saved
    var url = await urlModel.findOne({targetURL: targetURL});
    // if url=null returned (no entry found), create new database entry
    if (!url){
        var numberOfEntries = await  urlModel.count() ;
        var url = new urlModel({targetURL:targetURL, shortURL: formatNumber(numberOfEntries + 1) });
        await url.save();
        res.json({original_url: url.targetURL, short_url: "http://localhost:5000/" + url.shortURL});
    } else{
        res.json({original_url: url.targetURL, short_url: "http://localhost:5000/" + url.shortURL});
    }
});




module.exports = app;






