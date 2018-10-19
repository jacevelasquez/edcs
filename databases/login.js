var fs = require('fs');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
db2 = new sqlite3.Database('nns2018.db');
var http = require('http');
var bcrypt  = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');


exports.post = function (req, res){
	
	if(req.body.username != '' && req.body.pword != '')
	{
		   var username = req.body.username;
		   var password = req.body.pword;
		   
		   var hash = bcrypt.hashSync(password, salt);
		  
			// db2.all("SELECT * FROM login WHERE username = ?", [username], function(err, rows) {
			
			// if(rows.length > 0 ) {
			// if(err){ res.redirect('/'); }
					   // bcrypt.compare(password, rows[0].password , function(err, isMatch) {
								// if(err) {
										// return console.error(err);
										// res.redirect('/');
								// }
								// else if(isMatch)
								// {
									// req.session.username = req.body.username;
								

									// res.redirect('/legone/survey/surveyform/');
								// }
								// else
								// {
									// res.redirect('/');
								
								// }
						// });
			// }
			// else {
				// res.redirect ( '/');
			// }
			  
			// });	
			db2.all("SELECT * FROM login WHERE username = ? and type = ?", [username, password], function(err, rows) {
			
			if(rows.length > 0 ) {
			if(err){ res.redirect('/'); }
									req.session.username = req.body.username;
									res.redirect('/main/');
								
			}
			else {
				res.redirect ( '/');
			}
			  
			});
	}
	else{
		res.redirect('/');
	}
	
};

