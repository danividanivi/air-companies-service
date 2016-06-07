// Load required packages
var Company = require('../models/company');

// Create endpoint /api/companies for POSTs
exports.postCompany = function(req, res){
    // Create a new instance of the Company model
    var company = new Company();

    // Set the company properties that came from the POST data
    console.log(req.body);
    company.name = req.body.name;
    company.IATA = req.body.IATA;
    company.OACI = req.body.OACI;
    company.email = req.body.email;
    company.web = req.body.web;
    company.base = req.body.base;
    company.telephone = req.body.telephone;
    console.log(company);
    // Save the company and check for errors
    company.save(function (err) {
        if (err) {
            var error = new Object();
            error.status = 400;
            error.messsage = err.message;
            error.errors = [];
            if (err.errors) {
                if (err.errors.name) error.errors.push(err.errors.name.message);
                if (err.errors.IATA) error.errors.push(err.errors.IATA.message);
                if (err.errors.OACI) error.errors.push(err.errors.OACI.message);
                if (err.errors.email) error.errors.push(err.errors.email.message);
                if (err.errors.web) error.errors.push(err.errors.web.message);
                if (err.errors.base) error.errors.push(err.errors.base.message);
                if (err.errors.telephone) error.errors.push(err.errors.telephone.message);
            }
            res.status(error.status).json(error);
        } else
            //res.setHeader('Location', req.protocol + '://' + req.get('host') + req.originalUrl + '/' + company._id);
            res.status(201).json(company);
    });

};
// Create endpoint /api/companies for GET
exports.getCompanies = function(req, res){
    Company.find(function(err, companies){
        if(err)
            res.send(err);

        res.json(companies);
    });
};

// Create endpoint /api/companies/:company_id for GET
exports.getCompany = function (req, res) {
    name = req.params.company_name;
    Company.findOne({'name':name}, function (err, company) {
        if (err)
            res.send(err);
       else
            res.json(company);
    });
};
// Create endpoint /api/companies/:company_id for PUT
exports.putCompany = function (req, res) {
    Company.findById(req.params.company_id, function (err, company) {
        if (err)
            res.send(err);

        company.Name = req.body.Name;
        company.IATA = req.body.IATA;
        company.OACI = req.body.OACI;
        company.email = req.body.email;
        company.Web = req.body.Web;
        company.Base = req.body.Base;
        company.Telephone = req.body.Telephone;

        company.save(function (err) {
            if (err)
                res.send(err);
            res.json(company);
        });
    });
};

// Create endpoint /api/companies/:company_id for DELETE
exports.deleteCompany = function (req, res) {
    Company.findByIdAndRemove(req.params.company_id, function (err, company) {
        if (err)
            res.send(err);

        res.status(204).send();
    });
};
