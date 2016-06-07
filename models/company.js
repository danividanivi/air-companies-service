// Load the required packages
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Define our company schema
var CompanySchema = new mongoose.Schema({
    name: {type: String, required: 'Name is required', unique: true},
    IATA: {type: String, required: 'IATA code is required', match: [/^[A-Z0-9]{2}$/, 'invalid IATA format'], unique: true},
    OACI: {type: String, required: 'OACI code is required', match: [/^[A-Z]{3}$/, 'invalid OACI format'], unique: true},
    email: {type: String, required: 'email is required', unique: true},
    web: {type: String, required: 'web is required', unique: true},
    base: {type: String, required: 'Base City is required', unique: true},
    telephone: {type: String, required: 'Telephone number is required', match: [/^[0-9]{9}$/, 'invalid Telephone format'], unique: true}
});

// Apply the uniqueValidator plugin to CompanySchema.
CompanySchema.plugin(uniqueValidator);

// Export the Mongoose model
module.exports = mongoose.model('Company', CompanySchema);
