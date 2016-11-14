var mongoose = require('mongoose');

var offersSchema = new mongoose.Schema({
    id_civiweb: String,
    job_title: String,
    city: String,
    country: String,
    company: String,
    url: String
}, { collection: 'civiweb'});

mongoose.model('Offers', offersSchema);