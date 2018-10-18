var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');

exports.get = function(req, res){
  
	db3.all("SELECT * from f76 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "'", function(err,rows){

			res.render('cpr.ejs',{rows:rows,layout:false,session:req.session});
  
	});

};

exports.view = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	
	// console.log("SELECT * from f76 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE = '"+ req.body.MEMBER_CODE +"'");

	  db3.all("SELECT * from f76 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE='" + req.body.MEMBER_CODE + "'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		// res.send(rows);
		
		// console.log(rows);
		console.log(rows);
		rows.forEach(function (row) {
			res.send(row);
        });
		
     
	});	
};	

exports.call_f11 = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;

	  db3.all("SELECT * from f61 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE = '"+ req.body.MEMBER_CODE +"'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		res.send(rows);
		
		// rows.forEach(function (row) {
			// res.send(row);
        // });
     
	});	
};	

exports.respondents_f11 = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;

	  db3.all("SELECT * from f11 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		res.send(rows);
		
		// rows.forEach(function (row) {
			// res.send(row);
        // });
     
	});	
};	

exports.save = function(req, res){
		
	var input = JSON.parse(JSON.stringify(req.body));
	var arr = [];
	var insvar = [];
	var insval = [];

	
	Object.keys(input).forEach(function(key) {
		if(key!== 'eacode' && key!== 'hcn' && key!== 'shsn' && key!== 'MEMBER_CODE'){
		  arr.push([key]+"= '"+req.body[key]+"' ");
		}
	});
	
	Object.keys(input).forEach(function(key) {
		  insvar.push([key]);
	});
	
	Object.keys(input).forEach(function(key) {
		  insval.push(req.body[key]);
	});	
	
	console.log(req.body.tick_A);
		
	
	db3.all("SELECT * from f76 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "' and MEMBER_CODE='" + req.body.MEMBER_CODE + "'", function(err,rows){
		
	if(rows == '') {
		console.log('insert');
		db3.run('INSERT OR IGNORE INTO f76 ('+ insvar.join(",")+') values ("'+insval.join('","')+'");');
	}
	else {
		console.log('update');
		db3.run('UPDATE f76 SET '+arr+', RES_NAME = "'+req.body.RES_NAME+'" where eacode = "' + req.body.eacode + '" and hcn = "' + req.body.hcn + '" and shsn = "' + req.body.shsn + '" and MEMBER_CODE = "' + req.body.MEMBER_CODE + '"',function(err) {
	if(err)  { res.send('err'); }
	
		else 
		{	
		res.send('/')
		}
	});
		
	}
 
	});

	res.redirect("/cpr/"+req.body.eacode+req.body.hcn+req.body.shsn+req.body.MEMBER_CODE);
};








