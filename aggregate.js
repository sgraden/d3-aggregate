function sum (){


}

function count() {

}

function average(){


}

function min(){


}

function max(){

}
"use strict";

var margin = {top: 20, right: 20, bottom: 30, left: 50};
var w = 640 - margin.left - margin.right;
var h = 480 - margin.top - margin.bottom;

var col = d3.scale.category10();

var col2 = d3.scale.linear()
	.domain([0, 1000])
	.range(["white", "black"]);

var svg = d3.select("#graph").append("svg")
	.attr("width", w + margin.left + margin.right)
	.attr("height", h + margin.top + margin.bottom)
.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var maxWins = 0; //Global store for wins
var maxRank = 0; //Global store for rank

var winsMap    = new Map();
var winsMapArr = [];

var format     = d3.time.format("%b %Y");

var attributes = ["Rank", "Wins"];
var ranges; // format = [[minRank, maxRank], [minWins, MaxWins]]

var dataset;
var winsBegin  = 0;
var winsEnd    = maxWins;
var rankBegin  = 0;
var rankEnd    = maxRank;

var currentSurface = "all";
var currentGender = "all";
	
$(document).ready(function() {

	d3.csv("newTennisData.csv", function(error, tennis) {
		if (error) {
			return console.log(error);
		}
		tennis.forEach(function(d) { //Convert data to Numbers
			//console.log(d);
			d.rank = +d.Rank;
			d.wins = +d.Wins;
			if (d.rank >= maxRank) {
				maxRank = +d.rank;
			}
			countMap(d);
		});
		rankEnd = maxRank;
		winsMapArr = convertMapToArray(winsMap);

		ranges = [[0, maxRank], [0, maxWins]]; //Initialized after MaxRank/MaxWins started

		createGraphAxis();
		createSliders();

		dataset = tennis;
		drawVis(winsMapArr);
	});
	$("#surfaceSelect").change(function(){ 
		var value = $('#surfaceSelect').val();  
		currentSurface = value;                      
		filterData();                  
	});
	$("#genderSelect").change(function(){                   
		var value = $('#genderSelect').val(); 
		currentGender = value;                       
		filterData();                  
	});
}); 

function countMap (d) {
	if (winsMap.has(d.Name)) { //if it has the name, increment
		winsMap.set(d.Name, 
			{
				Name: d.Name,
				Surface: "All",
				rank: d.rank,
				wins: winsMap.get(d.Name).wins + +d.wins,
				Gender: d.Gender
			}
		);
	} else { //insert the name
		winsMap.set(d.Name, 
			{
				Name: d.Name,
				Surface: "All",
				rank: d.rank,
				wins: +d.wins,
				Gender: d.Gender
			}
		);
	}
}

function convertMapToArray(map) {
	var arr = [];
	map.forEach(function(d) {
		arr.push(d);
		if (d.wins > maxWins) {
			maxWins = d.wins;
		}
	});
	winsEnd = maxWins
	return arr;
}








