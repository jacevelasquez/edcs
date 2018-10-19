var fs = require('fs');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('localsurveydb_lr3.db');
var http = require('http');

exports.get = function(req, res){

    res.render('localsurvey.ejs');

};


exports.post = function(req, res){


	
	 res.redirect("/legone/survey/surveyform");
		
};

