"use strict";

(function () {
	$(document).ready(function () {

		d3.csv("tenisdataset.csv", function(error, tennis) {
			//console.log(tennis);
			if (error) {
				return console.log(error);
			}
			console.log(tennis);
			//console.log(Agg.avg(tennis, "WPts", ["Winner", "Series", "Surface"]));
			//console.log(Agg.sort(tennis, "WRank"));
			var avg = Agg.avg(tennis, "WPts", ["Winner"]);
			console.log(Agg.range(avg, "Avg. WPts"));
		});
	});
})();