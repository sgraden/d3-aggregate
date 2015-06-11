var margin = {top: 20, right: 20, bottom: 30, left: 70};
    var w = 960 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;
	
var format = d3.time.format("%b %Y");
var dataset;
var x = d3.scale.ordinal()
	.domain(["Europe", "Asia", "America", "Africa", "Oceania", "Not Specified "])
    .rangeRoundBands([0, w - margin.left - margin.right], .1);
/*var x = d3.scale.linear()
	.domain([1820, 2000])
	.range([0, w]);*/
	
var y = d3.scale.linear()
        .domain([0, 5500000])
        .range([h, 0]);

d3.csv("immigrationData.csv", function(error, immigrationData) {
	if(error) return console.warn(error);
		//console.log(immigrationData);
		var headerNames = d3.keys(immigrationData[0]);
		console.log(headerNames);
		immigrationData.forEach(function(d){
		console.log(d["1820"]);
		d["1820"] = +d["1820"];
		d["1830"] = +d["1830"];
		d["1840"] = +d["1840"];
		d["1850"] = +d["1850"];
		d["1860"] = +d["1860"];
		d["1870"] = +d["1870"];
		d["1880"] = +d["1880"];
		d["1890"] = +d["1890"];
		d["1900"] = +d["1900"];
		d["1910"] = +d["1910"];
		d["1920"] = +d["1920"];
		d["1930"] = +d["1930"];
		d["1940"] = +d["1940"];
		d["1950"] = +d["1950"];
		d["1960"] = +d["1960"];
		d["1970"] = +d["1970"];
		d["1980"] = +d["1980"];
		d["1990"] = +d["1990"];
		d["2000"] = +d["2000"];
		var yPosition = y(d["1820"]);
		console.log(yPosition);

		//d.date = format.parse(d.date);
		});
dataset = immigrationData;
	console.log(dataset);
	//console.log(function(d) {return y(d["1820"]);});
	//var xPosition = x.(d["Region"]);}
	//console.log(xPosition);
	var circles = svg.selectAll("rect")
 .data(dataset)
 .enter()
 .append("rect")
	/*.attr("cx", function(d) { return x(d["1820]) +margin.left;  })
    .attr("cy", function(d) { return y(d["1820"]) + margin.top;  })
    .attr("r", 4)
    .style("stroke", "black")
	.attr("fill", function(d) { return col(d.type);})
	.attr("opacity", 0.5)*/ 
	
    .attr("x", function(d) { return x(d["Region"]) + margin.left;  })
    .attr("height", function(d) { return h - y(d["1820"]); })
	.attr("y", function(d) { return y(d["1820"]) + margin.top;})
    .attr("width", function(d){ return x.rangeBand();})
    .style("stroke", "black")
	.attr("fill", function(d) { return col(d["Region"]);})
	.attr("opacity", 0.5)
	.on("mouseover", function(d){ 
		//d3.select(this).attr('r', 8)
		tooltip.transition()                
			.duration(200)                
			.style("opacity", 1)           
		tooltip.html('Immigration Population:<b>'+d["1820"] + '</b>')
		tooltip.style("position", "absolute")
		tooltip.style("left", d3.event.pageX + "px")
		console.log(d3.event.pageX)
		console.log(d3.event.pageY);
		tooltip.style('top', (d3.event.pageY - 28) + 'px'); 	
	})   
	.on("mouseout", function(d,i){ 
		//d3.select(this).attr('r', 4);
		tooltip.transition()
			.duration(500)
			.style("opacity", 0);
	}); 
//visualizeData(dataset);*/
});

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
	
function newData(year) {
console.log(year);
var newRectangle = svg.selectAll("rect");
newRectangle.remove();

newRectangle=svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
		.attr("x", function(d) { return x(d["Region"]) + margin.left;  })
		.attr("height", function(d) { return h - y(d[year]); })
		.attr("y", function(d) { return y(d[year]) + margin.top;})
		.attr("width", function(d){ return x.rangeBand();})
		.style("stroke", "black")
		.attr("fill", function(d) { return col(d["Region"]);})
		.attr("opacity", 0.5)
		.on("mouseover", function(d){ 
			//d3.select(this).attr('r', 8)
			tooltip.transition()                
				.duration(200)                
				.style("opacity", 1)           
			tooltip.html('Immigration Population:<b>'+d[year] + '</b>')
			tooltip.style("position", "absolute")
			tooltip.style("left", d3.event.pageX + "px")
			console.log(d3.event.pageX)
			console.log(d3.event.pageY);
			tooltip.style('top', (d3.event.pageY - 28) + 'px'); 	
		})   
		.on("mouseout", function(d,i){ 
			//d3.select(this).attr('r', 4);
			tooltip.transition()
				.duration(500)
				.style("opacity", 0);
		});
}
 
	





/*var circles = svg.selectAll("circle")
 .data(data)
 .enter()
 .append("circle")
    .attr("cx", function(d) { return x(d.price);  })
    .attr("cy", function(d) { return y(d.tValue);  })
    .attr("r", 4)
    .style("stroke", "black")
	.attr("fill", function(d) { return colAl(d.vol);})
	.attr("opacity", 0.5)*/