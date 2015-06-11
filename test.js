"use strict";

(function () {
	$(document).ready(function () {

		d3.csv("tenisdataset.csv", function(error, tennis) {
			//console.log(tennis);
			if (error) {
				return console.log(error);
			}
			console.log(tennis);
			/*console.log(Agg.avg(tennis, "Name", "Wins"));
			console.log(Agg.sum(tennis, "Name", "Wins"));
			console.log(Agg.count(tennis, "Name"));
			console.log(Agg.count(tennis, "Name", "federer r.")); */
			// console.log(Agg.review(tennis, "Winner", "WPts", "Matosevic M."));
			console.log(Agg.avg(tennis, "WPts", ["Winner", "Series", "Surface"]));
			console.log(Agg.rangeMax(tennis, "WRank", ["Winner"]));
		});
	});
})();