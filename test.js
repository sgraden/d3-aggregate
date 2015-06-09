"use strict";

(function () {
	$(document).ready(function () {

		d3.csv("newTennisData.csv", function(error, tennis) {
			//console.log(tennis);
			if (error) {
				return console.log(error);
			}
			//var columns = new Map();
			// headerNames = d3.keys(tennis[0]);
			// for(var i = 0; i < headerNames.length; i++) {
			// 	columns.set(headerNames[i], []);
			// }
			// //console.log(columns);		
			// //console.log(headerNames);
			// tennis.forEach(function(d) { //Convert data to Numbers
			// });
			var d = "Name";
			//console.log(tennis[0].d);
			console.log(Agg.avg(tennis, "Name", "Surface", "Wins"));
		});

	});
})();