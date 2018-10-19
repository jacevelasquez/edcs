var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');

exports.get = function(req, res){
  
	db3.all("SELECT * from f61 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "' and MEMBER_CODE > 0", function(err,rows){
			res.render('mealpattern.ejs',{rows:rows,layout:false,session:req.session});
  
	});

};

exports.view = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;

	  db3.all("SELECT * from f61 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		// res.send(rows);
		
		rows.forEach(function (row) {
			res.send(row);
        });
     
	});	
};	


exports.update = function(req, res){
	// console.log(req.body);
	var name = req.body.name;
	var value = req.body.value;
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	var membercode = req.body.MEMBER_CODE;
	console.log('UPDATE f61 SET ' + name + ' = "' + value + '" where eacode = "' + eacode + '" and hcn = "' + hcn + '" and shsn = "' + shsn + '" and MEMBER_CODE = "' + membercode + '"');
	db3.run('UPDATE f61 SET ' + name + ' = "' + value + '" where eacode = "' + eacode + '" and hcn = "' + hcn + '" and shsn = "' + shsn + '" and MEMBER_CODE = "' + membercode + '"');
		res.send('/'); // redirect to '/' after storing data

};

exports.updatestatus = function(req, res){
	
	db3.all("SELECT * from f60 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "'", function(err,rows){
	if(rows == '') {
			db3.run('INSERT OR IGNORE INTO f60 (eacode, hcn, shsn, '+req.body.name+') values ("'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.val+'")');
	}
	else {
		db3.run('UPDATE f60 SET ' + req.body.name + ' = "' + req.body.val + '" where eacode = "' + req.body.eacode + '" and hcn = "' + req.body.hcn + '" and shsn = "' + req.body.shsn + '"',function(err) {
	if(err)  { res.send('err'); }
		else res.send('/')
	});
		
	}
 
	});

};

exports.save = function(req, res){
	
	db3.all("SELECT * from f61 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "' and MEMBER_CODE ='"+req.body.MEMBER_CODE+"'", function(err,rows){
		console.log(rows);
	if(rows != '') {
	res.send('error');	
	}
	else {
	db3.run('INSERT OR IGNORE INTO f11 (eacode, hcn, shsn, MEMBER_CODE, SURNAME, GIVENNAME, AGE, SEX, PSC) VALUES ( "'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.MEMBER_CODE+'", "'+req.body.SURNAME+'", "'+req.body.GIVENNAME+'", "'+req.body.AGE+'", "'+req.body.SEX+'", "'+req.body.PSC+'")');
	
	db3.run('INSERT OR IGNORE INTO f61 (eacode, hcn, shsn, MP, MEMBER_CODE, SURNAME, GIVENNAME, AGE, SEX, PSC, BF, AMSNCK, LUNCH, PMSNCK, SUPPER, LATESNCK, INTERVIEW_STATUS) VALUES ( "'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.MP+'", "'+req.body.MEMBER_CODE+'", "'+req.body.SURNAME+'", "'+req.body.GIVENNAME+'", "'+req.body.AGE+'", "'+req.body.SEX+'", "'+req.body.PSC+'", "'+req.body.BF+'", "'+req.body.AMSNCK+'", "'+req.body.LUNCH+'", "'+req.body.PMSNCK+'", "'+req.body.SUPPER+'", "'+req.body.LATESNCK+'", "'+req.body.INTERVIEW_STATUS+'" )', function (err){
	if(err)  { console.log(err); res.send('err'); }
		else res.send('ok')
	});
	
	}
	
	});

};









