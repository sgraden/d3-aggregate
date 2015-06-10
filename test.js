"use strict";

(function () {
	$(document).ready(function () {

		d3.csv("newTennisData.csv", function(error, tennis) {
			//console.log(tennis);
			if (error) {
				return console.log(error);
			}
			console.log(tennis);
			console.log(Agg.avg(tennis, "Name", "Wins"));
			console.log(Agg.sum(tennis, "Name", "Wins"));
			console.log(Agg.count(tennis, "Name"));
			console.log(Agg.count(tennis, "Name", "federer r."));

		});

	});
})();