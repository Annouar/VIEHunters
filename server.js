var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
//app.use(bodyParser);
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

require('./server/models/offers');
mongoose.connect('mongodb://localhost/vie');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error ...'));
db.once('open', function callback(){
    console.log('vie db opened');
})


app.get('/offers/:partialPath', function(req, res) {
    res.render('offers/' + req.params.partialPath);
});

var Offer = mongoose.model('Offers');
app
    .get('/offers', function(request, response, next) {
        Offer.find()
            .sort({ published_date: 'descending'})
            .limit(parseInt(request.query.limit) || 100)
            .exec(function(err, offers) {
                if(err) {
                    return next(err);
                }

                response.json(offers);
            });
    })
    .get('/offers/VIE/:ref1/:ref2', function(request, response, next) {
       Offer.findOne({id_civiweb: 'VIE/' + request.params.ref1 + '/' + request.params.ref2})
           .exec(function(err, offer) {
                if(err) {
                    return next(err);
                }

                response.json(offer);
        });
    });

app.get('*', function(req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port, function() {
    console.log('Listening on port ' + port + '...');
});
