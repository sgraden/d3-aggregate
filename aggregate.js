"use strict";

var max = 0;
var min = 0;


$(document).ready(function() {

	d3.csv("newTennisData.csv", function(error, tennis) {
		if (error) {
			return console.log(error);
		}
/*		tennis.forEach(function(d) { //Convert data to Numbers
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
		drawVis(winsMapArr);*/
	});

}); 

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

	











