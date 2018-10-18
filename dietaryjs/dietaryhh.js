var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');

exports.get = function(req, res){

  db3.all("SELECT distinct eacode, hcn, shsn FROM f11 WHERE eacode='" + req.params.id + "' and hcn > 0 and shsn > 0", function(err,rows){  
    res.render('dietaryhh.ejs',{rows:rows,layout:false,session:req.session});
  });
};

exports.post = function(req, res){
	
	console.log(req.body.eacode);
	
	db3.all("SELECT * FROM f11 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "'",function(err,rows) {
		console.log(rows);
	if(rows == '')	
	{
	db3.all("INSERT or ignore INTO f11 (eacode,hcn,shsn) values ('"+req.body.eacode+"','"+req.body.hcn+"','"+req.body.shsn+"')");
	db3.all("INSERT or ignore INTO f61 (eacode,hcn,shsn) values ('"+req.body.eacode+"','"+req.body.hcn+"','"+req.body.shsn+"')");
	res.send("ok");
	}
	else { 
	res.send("exist");
	}
	
	});
	
	
 
};

exports.hhlines = function(req, res){

	db3.all("SELECT * FROM f63 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "'",function(err,rows) {
	
	res.send(rows);
	});
 
};

exports.dietarymembercount = function(req, res){

	db3.all("SELECT * FROM f61 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "'",function(err,rows) {
	
	res.send(rows);
	});
 
};










