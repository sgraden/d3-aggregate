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
			console.log(Agg.max(tennis, "WPts", ["Winner"]));
			console.log(Agg.count(tennis, ["Winner"]));
			var winCount = Agg.count(tennis, ["Winner", "Gender"]);
			console.log(Agg.max(winCount, "Count", ["Winner"]));
			console.log(Agg.rangeMax(tennis, "WRank", ["Winner"]));
			console.log(Agg.sortDescending(tennis, "WRank"));
			var sortedWinCount = Agg.sortDescending(winCount, "Count");
			console.log(sortedWinCount);
			var topTen = Agg.take(sortedWinCount, 10);
			console.log(topTen);

var margin = {top: 20, right: 20, bottom: 30, left: 70};
    var w = 960 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;
	
var format = d3.time.format("%b %Y");
var dataset;
/*var x = d3.scale.ordinal()
	.domain(["Europe", "Asia", "America", "Africa", "Oceania", "Not Specified "])
    .rangeRoundBands([0, w - margin.left - margin.right], .1);*/
/*var x = d3.scale.linear()
	.domain([1820, 2000])
	.range([0, w]);*/
	
var y = d3.scale.linear()
        .domain([0, 68])
        .range([h, 0]);
 
 var x = d3.scale.ordinal()
    .rangeRoundBands([0, w - margin.left - margin.right], .1);
 x.domain(winCount.map(function(d) { return d.Winner; }));





var tooltip = d3.select("body").append("div")     
	.attr("class", "tooltip")     
	.style("opacity", 0);  

var col = d3.scale.category10();


		
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
	

		
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");
	

	
var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);
svg.append("g")
	.attr("class", "axis")
    .attr("transform", "translate(" + margin.left+ "," + (h + margin.top) + ")")
	.call(xAxis);
  
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + margin.left+ "," + margin.right + ")")
	.call(yAxis);
	






			
		});
	});
})();