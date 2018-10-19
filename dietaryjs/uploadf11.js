exports.post = function(req, res){
	
	eacode = req.body.eacode;
	region = req.body.regcode;
	province = req.body.provcode;
	municipality = req.body.muncode;
	barangay = req.body.brgycode;
	ea = req.body.ea;
	areaname = req.body.areaname;
		
	db2.run("INSERT INTO localsurveyareas (eacode, region, province, municipality, barangay, ea, areaname) VALUES ($eacode, $region, $province, $municipality, $barangay, $ea, $areaname)",
	{	
		$eacode : eacode,
		$region : region,
		$province : province,
		$municipality : municipality,
		$barangay : barangay,
		$ea : ea,
		$areaname : areaname
	});
	
	res.redirect("http://localhost:3000/legone/survey/surveyform");

		
};




