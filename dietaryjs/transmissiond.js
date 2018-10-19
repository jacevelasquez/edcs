var fs = require('fs');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
db3 = new sqlite3.Database('foodconsumption.db');
var http = require('http');
var json2csv = require('json2csv');
const csv=require('csvtojson');
var multer= require('multer');
var upload = multer({ dest: 'uploads/' })
var Zip = require('node-7z'); // Name the class as you want! 
var unzip = require('unzip');
var easyzip = require('easy-zip');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '122.53.86.117',
  port	   : '3674',
  user     : 'johncarlo',
  password : 'nsis',
  database : 'nns2018db'
});

/****************************************************** UPLOAD ******************************************************/

exports.extract =  function (req, res, next) {
	csvFilePath=req.file.path;
	
	fs.createReadStream(csvFilePath).pipe(unzip.Extract({ path: 'C:/dcs/consolidation' }));
	
};

exports.email =  function (req, res, next) {
	csvFilePath=req.file.path;
	
	'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
	
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'enns.fnridost@gmail.com', // generated ethereal user
            pass: 'namdnsis3'  // generated ethereal password
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'enns.fnridost@gmail.com', // sender address
        to: 'enns.surveyteam@gmail.com', // list of receivers
        subject: 'FROM : '+ req.session.username, // Subject line
        text: 'Transmitted data', // plain text body
        html: 'Transmitted data sent by '+req.session.username+'. Please download attached file (in zip)', // html body
		attachments: [{path:"C:/Users/ENCODER/Downloads/"+req.file.originalname, type:"application/zip", name:"renamed.zip"}]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
});
	
};

exports.upload = function (req, res, next) {
  

  var array_name = ['d_f11','d_f60','d_f61','d_f63','d_f64','d_f71','d_f76'];
  
  var array_length = array_name.length;
  for(var i = 0 ; i< array_length ; i++){
  var name = array_name[i]+"_"+req.file.originalname.substring(0,req.file.originalname.length-8)+".csv";
  
  csvFilePath='C:/dcs/consolidation/'+array_name[i].substring(2,5)+"_"+req.file.originalname.substring(0,req.file.originalname.length-8)+".csv";
  	console.log(name);
	console.log(csvFilePath);
  var form_name = array_name[i];
 
  csv_transmit(name,form_name);
 
}

res.write('<style>.one { opacity: 0; -webkit-animation: dot 1.3s infinite; -webkit-animation-delay: 0.0s; animation: dot 1.3s infinite; animation-delay: 0.0s; }.two { opacity: 0; -webkit-animation: dot 1.3s infinite; -webkit-animation-delay: 0.2s; animation: dot 1.3s infinite; animation-delay: 0.2s; }.three { opacity: 0; -webkit-animation: dot 1.3s infinite; -webkit-animation-delay: 0.3s; animation: dot 1.3s infinite; animation-delay: 0.3s; }@-webkit-keyframes dot { 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1; } }@keyframes dot { 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1; } }</style><body>');
	res.write('<div style="height: 200px;width: 400px;position: fixed;top: 40%;left: 50%;margin-top: -100px;margin-left: -200px;"><font size="7">Transmitting data Please Wait<span class="one">.</span><span class="two">.</span><span class="three">.</span></font><br><br>Check the command prompt if it is transmitting; <br> <b>O</b> - If it appends "INSERTED RECORD" repeatedly <br> <b>X</b> - Displays error messages, Query error or Fatal error <br><br></div></body>');
	res.write('<script type="text/javascript"> window.location.href="/checktransD/'+req.file.originalname.substring(0,12)+'";</script>');
	res.end()

};


function JSON2mySQL(json,name,form_name){
   var col = [];
   var values =[];
   var  sql ="";
   var  rn = 0;
   var arr = name.split('_');

     for (var k in json){
            if(k=='id'){
                // console.log(sql);   
               if(col.length>0){
                    db2.all(sql  ,function(err,rows){
                      if(err) //console.log(err);
                       rn++;
                       // console.log("INSERTED RECORD #" + rn);
                  //      console.log("1st : " + sql);
                   });
                         col = [];
                         values = [];
                       }
             }
            else{
              col.push(k);
              values.push(json[k]);
			  
            }
        }
		// console.log(form_name);
           if(col.length>0){
                  sql = "INSERT IGNORE INTO "+form_name+"("  + col.join(",") + ") VALUES('" +  values.join("','") + "');";
                 connection.query(sql  ,function(err,rows){
                    if(err) console.log("Error number : " + err);
                                       rn++;
                      
					   console.log("INSERTED RECORD : "+form_name);
                });
                  col = [];
                  values = [];

             }
			 
}

function csv_transmit(name,form_name){
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    JSON2mySQL(jsonObj,name,form_name);
})
.on('done',(error)=>{
    console.log('Upload Success');
	
})
};