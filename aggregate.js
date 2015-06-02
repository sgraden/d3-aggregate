"use strict";

$(document).ready(function() {

	var columns = new Map();
	var headerNames;
	d3.csv("newTennisData.csv", function(error, tennis) {
		if (error) {
			return console.log(error);
		}
		//var columns = new Map();
		headerNames = d3.keys(tennis[0]);
		for(var i = 0; i < headerNames.length; i++) {
			columns.set(headerNames[i], []);
		}
		console.log(columns);		
		console.log(headerNames);
		tennis.forEach(function(d) { //Convert data to Numbers
			//console.log(d);
			//.console.log(typeof(d.Rank));
			d.Rank = +d.Rank;
			d.Wins = +d.Wins;
			for(i = 0; i <headerNames.length; i++) {
				columns.get(headerNames[i]).push(d[headerNames[i]]);
			}
			
			
		});
				console.log(columns);		

		console.log(tennis);
		console.log(sum(columns.get("Wins")));
	});
	
}); 

function getColumns(fileName) {
	var columns = new Map();
	d3.csv(fileName, function(error, tennis) {
		if (error) {
			return console.log(error);
		}
		//var columns = new Map();
		var headerNames = d3.keys(tennis[0]);
		for(var i = 0; i < headerNames.length; i++) {
			columns.set(headerNames[i], []);
		}
		console.log(columns);		
		console.log(headerNames);
		tennis.forEach(function(d) { //Convert data to Numbers
			//console.log(d);
			console.log(typeof(d.Rank));
			d.Rank = +d.Rank;
			d.Wins = +d.Wins;
			for(i = 0; i <headerNames.length; i++) {
				columns.get(headerNames[i]).push(d[headerNames[i]]);
			}
			
			
		});
				console.log(columns);		

		console.log(tennis);
		console.log(sum(columns.get("Wins")));
	});
	return columns;
}

function sum (data){
	var sum = 0;
	data.forEach(function(d) { //Convert data to Numbers
			sum += d;
	});
	return sum;
}

function count(data) {
	var counter = 0;
	data.forEach(function(d) { //Convert data to Numbers
			counter++;
			});
	return counter;
}

function average(data){
	var sum = 0;
	var count = 1;
	data.forEach(function(d) { //Convert data to Numbers
			sum += d;
			count++;
			});
	var average = sum/count;
	return average;

}

function min(data){
	return d3.min(data);
}

function max(data){
	return d3.max(data);
}

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

	











