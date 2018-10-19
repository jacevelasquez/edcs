var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
const csv=require('csvtojson')
db3 = new sqlite3.Database('foodconsumption.db');

exports.get = function(req, res){

  db3.all("SELECT * from f71 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "' and MEMBER_CODE='" + req.params.id.substring(20,22) + "' and RECDAY = '" + req.params.recday + "' and LINENO > 0 order by LINENO*1", function(err,rows){  
		
		db3.all("SELECT * from f11 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "' and MEMBER_CODE='" + req.params.id.substring(20,22) + "'", function(err,rows2){ 
		
					res.render('foodrecall.ejs',{rows:rows,rows2:rows2,layout:false,session:req.session});
					
		});			
  });
};

exports.members = function(req, res){

  db3.all("SELECT * from f61 WHERE eacode='" + req.params.id.substring(0,12) + "' and hcn='" + req.params.id.substring(12,16) + "' and shsn='" + req.params.id.substring(16,20) + "' and MEMBER_CODE > 0", function(err,rows){  
	console.log(rows);
	res.render('members_d.ejs',{rows:rows,layout:false,session:req.session});
  });
};

exports.view = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;

	  db3.all("SELECT * from f71 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' order by LINENO*1", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		 res.send(rows);
		
		// rows.forEach(function (row) {
			// res.send(row);
        // });
     
	});	
};	

exports.status = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	var MEMBER_CODE = req.body.MEMBER_CODE;
	var RECDAY = req.body.RECDAY;
	
	  db3.all("SELECT * from f71 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE='" + MEMBER_CODE + "' and RECDAY='" + RECDAY + "'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}
		res.send(rows);
	});	
};	

exports.update = function(req, res){
	
	db3.run('UPDATE f71 set LINENO = "'+req.body.LINENO+'" , FIC = "'+req.body.FIC+'" , FOODITEM = "'+req.body.FOODITEM+'" , FOODDESC = "'+req.body.FOODDESC+'" , FOODBRND = "'+req.body.FOODBRND+'" , FVS = "'+req.body.FVS+'" , ISFORTIFIED = "'+req.body.ISFORTIFIED+'" , VITA = "'+req.body.VITA+'" , IRON = "'+req.body.IRON+'" , OTHF = "'+req.body.OTHF+'" , FOODMAINING = "'+req.body.FOODMAINING+'" , FOODBRNDCD = "'+req.body.FOODBRNDCD+'" , AMTSIZEMEAS = "'+req.body.AMTSIZEMEAS+'" , MEALCD = "'+req.body.MEALCD+'" , RFCODE = "'+req.body.RFCODE+'" , FOODCODE = "'+req.body.FOODCODE+'" , FOODEX = "'+req.body.FOODEX+'" , FOODWEIGHT = "'+req.body.FOODWEIGHT+'" , RCC = "'+req.body.RCC+'" , CMC = "'+req.body.CMC+'" , SUPCODE = "'+req.body.SUPCODE+'" , SRCCODE = "'+req.body.SRCCODE+'" , OTH_SRC = "'+req.body.OTH_SRC+'" , CPC = "'+req.body.CPC+'" , UNITCOST = "'+req.body.UNITCOST+'" , UNITWGT = "'+req.body.UNITWGT+'" , UNITMEAS = "'+req.body.UNITMEAS+'" , CLEAN = "'+req.body.CLEAN+'", DATEENC = "'+req.body.DATEENC+'" , FOOD_ITEM = "'+req.body.FOOD_ITEM+'" , DATE_EDIT = "'+req.body.DATE_EDIT+'" where id = "'+req.body.id+'"', function(err) {
	
	if(err)  { 
	console.log(err);
	res.send('err'); }
		else res.send('/')
	});


};

exports.updatestatus = function(req, res){
	
	db3.all("SELECT * from f71 WHERE eacode='" + req.body.eacode + "' and hcn='" + req.body.hcn + "' and shsn='" + req.body.shsn + "' and MEMBER_CODE='" + req.body.MEMBER_CODE + "' and RECDAY='" + req.body.RECDAY + "'", function(err,rows){
		
	if(rows == '') {
			db3.run('INSERT OR IGNORE INTO f71 (eacode, hcn, shsn, '+req.body.name+', MEMBER_CODE, RECDAY) values ("'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.val+'", "'+req.body.MEMBER_CODE+'", "'+req.body.RECDAY+'")');
			console.log('insert');
	}
	else {
					console.log('update');

		db3.run('UPDATE f71 SET ' + req.body.name + ' = "' + req.body.val + '" where eacode = "' + req.body.eacode + '" and hcn = "' + req.body.hcn + '" and shsn = "' + req.body.shsn + '" and MEMBER_CODE = "' + req.body.MEMBER_CODE + '" and RECDAY = "' + req.body.RECDAY + '"',function(err) {
	if(err)  { res.send('err'); }
	
		else 
		{	
		res.send('/')
		}
	});
		
	}
 
	});

};

exports.save = function(req, res){
	
	db3.run('INSERT INTO f71 (eacode, hcn, shsn, MEMBER_CODE, RECDAY, LINENO, FIC, FOODITEM, FOODDESC, FOODBRND, FVS, ISFORTIFIED, VITA, IRON, OTHF, FOODMAINING, FOODBRNDCD, AMTSIZEMEAS, MEALCD, RFCODE, FOODCODE, FOODEX, FOODWEIGHT, RCC, CMC, SUPCODE, SRCCODE, OTH_SRC, CPC, UNITCOST, UNITWGT, UNITMEAS, CLEAN, FOOD_ITEM, DATE_EDIT) VALUES ( "'+req.body.eacode+'", "'+req.body.hcn+'", "'+req.body.shsn+'", "'+req.body.MEMBER_CODE+'", "'+req.body.RECDAY+'", "'+req.body.LINENO+'", "'+req.body.FIC+'", "'+req.body.FOODITEM+'", "'+req.body.FOODDESC+'", "'+req.body.FOODBRND+'", "'+req.body.FVS+'", "'+req.body.ISFORTIFIED+'", "'+req.body.VITA+'", "'+req.body.IRON+'", "'+req.body.OTHF+'", "'+req.body.FOODMAINING+'", "'+req.body.FOODBRNDCD+'", "'+req.body.AMTSIZEMEAS+'", "'+req.body.MEALCD+'", "'+req.body.RFCODE+'", "'+req.body.FOODCODE+'", "'+req.body.FOODEX+'", "'+req.body.FOODWEIGHT+'", "'+req.body.RCC+'", "'+req.body.CMC+'", "'+req.body.SUPCODE+'", "'+req.body.SRCCODE+'", "'+req.body.OTH_SRC+'", "'+req.body.CPC+'", "'+req.body.UNITCOST+'", "'+req.body.UNITWGT+'", "'+req.body.UNITMEAS+'", "'+req.body.CLEAN+'", "'+req.body.FOOD_ITEM+'", "'+req.body.DATE_EDIT+'")', function (err){
	if(err)  { res.send('err'); }
		else res.send('/')
	});

};

exports.memberstatus_d = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	var MEMBER_CODE = req.body.MEMBER_CODE;
	  db3.all("SELECT * from f76 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE='" + MEMBER_CODE + "'", function(err,rows){
		if (err) {
              console.log("Error Selecting : %s ",err );
		}

		res.send(rows);
		
	});	
};	

exports.memberlines = function(req, res){
	var obj = {};
	var eacode = req.body.eacode;
	var hcn = req.body.hcn;
	var shsn = req.body.shsn;
	var MEMBER_CODE = req.body.MEMBER_CODE;
	
    db3.all("SELECT * from f71 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE='" + MEMBER_CODE + "' and RECDAY = 1 and LINENO > 0", function(err,rows1){
		
		obj.rows1 = rows1;

		db3.all("SELECT * from f71 WHERE eacode='" + eacode + "' and hcn='" + hcn + "' and shsn='" + shsn + "' and MEMBER_CODE='" + MEMBER_CODE + "' and RECDAY = 2 and LINENO > 0", function(err,rows2){

		obj.rows2 = rows2;
		
		res.send(obj);
		
		});
		
	});	
};









