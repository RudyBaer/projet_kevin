var express = require('express');
var app = express();


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/projetk');


app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/api/joke',function(req, res){
    var db = req.db;
    var collection = db.get('jokes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


app.post('/api/joke',function(req, res){
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('jokes');

    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.json(doc);
        }
    });
});


app.use('/', express.static(__dirname + '/html/'));


var router = express.Router();

app.use('/api', router);

app.listen(3000);
