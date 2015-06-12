"use strict";

(function () {
	$(document).ready(function () {

		d3.csv("tenisdataset.csv", function(error, tennis) {
			//console.log(tennis);
			if (error) {
				return console.log(error);
			}

			//Average the original list and group by the Winner name, the tournament, and the surface type
			var avgPoints = Agg.avg(tennis, "WPts", ["Winner", "Tournament", "Surface"]);
			/* 
			Example:
				Avg. WPts: 711
				Surface: "Grass"
				Tournament: "Australian Open"
				Winner: "Ebden M."
			*/
			//Filter the dataset to only rows including "Hard" for surface type
			var filteredAvg = Agg.filter(avgPoints, ["Surface"], ["Hard"]);
			/* 
			Example:
				Avg. WPts: 1110
				Surface: "Hard"
				Tournament: "Australian Open"
				Winner: "Mayer F."
			*/
			//Shrink the list to 10 and sort it Alphabetically by winner name
			var sortedAvgSmall = Agg.sort(Agg.take(filteredAvg, 10), "Winner", "ASC");


			console.log(tennis);
			//console.log(Agg.avg(tennis, "WPts", ["Winner", "Series", "Surface"]));
			//console.log(Agg.max(tennis, "WPts", ["Winner"]));
			//console.log(Agg.count(tennis, ["Winner"]));

			var winCount = Agg.count(tennis, ["Winner", "Gender"]);

			// console.log(Agg.max(winCount, "Count", ["Winner"]));
			// console.log(Agg.range(tennis, "WRank", ["Winner"]));
			// console.log(Agg.sortDescending(tennis, "WRank"));
			var sortedWinCount = Agg.sort(winCount, "Count", "desc");
			var topTen = Agg.take(sortedWinCount, 10);
			console.log(topTen);
			console.log(Agg.filter(winCount, ["Gender", "Count"], ["Male", 15]));

var margin = {top: 20, right: 20, bottom: 30, left: 70};
    var w = 960 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;
	
var format = d3.time.format("%b %Y");
var dataset = topTen;


	
var y = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) { return d.Count; })])
        .range([h, 0]);
 
 var x = d3.scale.ordinal()
    .rangeRoundBands([0, w - margin.left - margin.right], .1)
 	.domain(dataset.map(function(d) { return d.Winner; }));

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
 
 var rectangles = svg.selectAll("rect")
 .data(dataset)
 .enter()
 .append("rect")
	/*.attr("cx", function(d) { return x(d["1820]) +margin.left;  })
    .attr("cy", function(d) { return y(d["1820"]) + margin.top;  })
    .attr("r", 4)
    .style("stroke", "black")
	.attr("fill", function(d) { return col(d.type);})
	.attr("opacity", 0.5)*/ 
	
    .attr("x", function(d) { return x(d["Winner"]) + margin.left;  })
    .attr("height", function(d) { return h - y(d["Count"]); })
	.attr("y", function(d) { return y(d["Count"]) + margin.top;})
    .attr("width", function(d){ return x.rangeBand();})
    .style("stroke", "black")
	.attr("fill", function(d) { return col(d["Winner"]);})
	.attr("opacity", 0.5)
	.on("mouseover", function(d){ 
		//d3.select(this).attr('r', 8)
		/*tooltip.transition()                
			.duration(200)                
			.style("opacity", 1)           
		tooltip.html('Immigration Population:<b>'+d["1820"] + '</b>')
		tooltip.style("position", "absolute")
		tooltip.style("left", d3.event.pageX + "px")
		console.log(d3.event.pageX)
		console.log(d3.event.pageY);
		tooltip.style('top', (d3.event.pageY - 28) + 'px');*/ 	
	})   
	.on("mouseout", function(d,i){ 
		//d3.select(this).attr('r', 4);
		/*tooltip.transition()
			.duration(500)
			.style("opacity", 0);*/
	}); 

		});
	});
})();