var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
db2 = new sqlite3.Database('nns2018.db');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.10.124.98',
  user     : 'jayz',
  password : 'NLPZJNWF',
  database : 'lgusurvey2017db'
});


exports.get = function(req, res){
	
	var id = req.params.id;
	var eacode2 = id.substring(0, 12);
	var hcn2 = id.substring(12, 16);
	var shsn2 = id.substring(16, 20);
	var MEMBER_CODE2 = id.substring(20,22);
	var SURNAME2 = id.substring(22,66);

	
db2.all("SELECT * FROM f11 WHERE eacode = ? and  hcn= ? and shsn= ? and MEMBER_CODE=?",[eacode2, hcn2, shsn2, MEMBER_CODE2], function(err,rows){
		
	db2.all("SELECT * FROM f411 WHERE eacode = ? and  hcn= ? and shsn= ? and MEMBER_CODE=?",[eacode2, hcn2, shsn2, MEMBER_CODE2], function(err,rows2){
	 
  		db2.all("SELECT * FROM questions WHERE qkey LIKE '%f411_%' ORDER BY qkey ASC", function(err,rows3){

			db2.all("SELECT * FROM answers WHERE qkey LIKE '%f411_%' ORDER BY qkey ASC", function(err,rows4){
				
				res.render('form411.ejs',{array:rows,array2:rows2,array3:rows3,array4:rows4,layout:false,session:req.session}); 
				
			}); 
		});	
	});	
});
};

exports.post = function(req, res){
	var m = new Date();
	var dateString =
	m.getFullYear() + "-" +
	("0" + (m.getMonth()+1)).slice(-2) + "-" +
	("0" + m.getDate()).slice(-2) + " " +
	("0" + m.getHours()).slice(-2) + ":" +
	("0" + m.getMinutes()).slice(-2) + ":" +
	("0" + m.getSeconds()).slice(-2);
		
	var input = JSON.parse(JSON.stringify(req.body));
	var set ='';
	var arr = [];
	
	Object.keys(input).forEach(function(key) {
		if(key!== 'eacode' && key!== 'hcn' && key!== 'shsn' && key!== 'MEMBER_CODE' && key!== 'record_type' && key!== 'house_url' && key!== 'memkey')	{
		  set +=' '+ key+'=?,';
		}
	});
	
	Object.keys(input).forEach(function(key) {
		if(key!== 'eacode' && key!== 'hcn' && key!== 'shsn' && key!== 'MEMBER_CODE' && key!== 'record_type' && key!== 'house_url' && key!== 'memkey' && key!== 'DATE_EDIT'){
		  arr.push(req.body[key]);
		}
	});
	arr.push(dateString, req.body.eacode, req.body.hcn, req.body.shsn, req.body.MEMBER_CODE );

	db2.all("UPDATE f411 SET "+set.replace(/,\s*$/, '')+" WHERE eacode = ? and hcn = ? and shsn = ? and MEMBER_CODE = ?",arr,function(err,rows){
		
		if (err) {
              console.log("Error Updating : %s ",err );
		}
		else console.log("Success updating form 4.11");
		
	})
		
		var input = JSON.parse(JSON.stringify(req.body));

		Object.keys(input).forEach(function(key) {
		  var val = input[key];
		  console.log('isEmpty(rows2[0].'+key+') && ');
		});
	
	
	res.redirect("/legone/survey/surveyform/form11/"+req.body.eacode+req.body.hcn+req.body.shsn);
		
};

exports.view = function(req, res){
	var obj = {};
	
	
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	var MEMBER_CODE = req.body.MEMBER_CODE;
	

	  db2.all("SELECT * FROM f411 WHERE eacode = ? and  hcn= ? and shsn= ? and MEMBER_CODE=?",[eacode, hcn, shsn, MEMBER_CODE], function(err,rows2){
		  
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		else console.log("Success selecting form 4.11"); 
		  
	  rows2.forEach(function (row) {
			res.send(row);
        });
	
		});	
	
	
};


