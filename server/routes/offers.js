var express = require('express'),
    mongoose = require('mongoose');
var Offer = mongoose.model('civiweb');

var router = express.Router();

router.get('/posts', function(request, response, next) {
   Offer.find(function(err, offers) {
      if(err) {
          return next(err);
      }

      response.json(request.query.limit);
   });
});

module.exports = router;