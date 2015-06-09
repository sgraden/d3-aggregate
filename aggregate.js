"use strict";
window.Agg = (function () {
	function Agg () {
	}
		    
	var agg = {
		avg: function(data, col1, col2, col3) {
			
			var counter = 0;
			var aggMap = aggregate(data, col1, col2, col3, "avg");
			console.log(aggregate(data, col1, col2, col3, "avg"));
			var objectArray = [];
			console.log(aggMap);
			//console.log(aggMap);
			for (var m in aggMap){
			    for (var i=0;i<aggMap[m].length;i++){
			    	console.log(aggMap[m][i]);
			    }
			} 
			console.log(objectArray.length);
			return objectArray;
		}

		sum: function(data, col1, col2, col3) {
			
			var counter = 0;
			var aggMap = aggregate(data, col1, col2, col3, "sum");
			console.log(aggregate(data, col1, col2, col3, "sum"));
			var objectArray = [];
			console.log(aggMap);
			//console.log(aggMap);
			for (var m in aggMap){
			    for (var i=0;i<aggMap[m].length;i++){
			    	console.log(aggMap[m][i]);
			    }
			} 
			console.log(objectArray.length);
			return objectArray;
		}

		max: function(data, col1, col2, col3) {
			
			var counter = 0;
			var aggMap = aggregate(data, col1, col2, col3);
			console.log(aggregate(data, col1, col2, col3));
			var objectArray = [];
			console.log(aggMap);
			//console.log(aggMap);
			for (var m in aggMap){
			    for (var i=0;i<aggMap[m].length;i++){
			    	console.log(aggMap[m][i]);
			    }
			} 
			console.log(objectArray.length);
			return objectArray;
		}

		min: function(data, col1, col2, col3) {
			
			var counter = 0;
			var aggMap = aggregate(data, col1, col2, col3);
			console.log(aggregate(data, col1, col2, col3));
			var objectArray = [];
			console.log(aggMap);
			//console.log(aggMap);
			for (var m in aggMap){
			    for (var i=0;i<aggMap[m].length;i++){
			    	console.log(aggMap[m][i]);
			    }
			} 
			console.log(objectArray.length);
			return objectArray;
		}

	};
   return agg;
}());


function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

function aggregate(data, col1, col2, col3, choice) {
	var avgData = [];
	var sum = 0;
	var count = 0;
	var keys = Object.keys(data[0]);
	//console.log(keys);
	var agg1 = 0;
	var aggMap = new Map();
	var objectArray = [];
	data.forEach(function (d) {
		var value = d[col1] + " " + d[col2];
		//console.log(value);
		var rData = [];
		if(aggMap.has(value)){
			
			//console.log(aggMap.get(value));
			//console.log(d);
			//console.log("here");
			var column = keys[i];
			var update = aggMap.get(value);
			update["count"]++;
			var count = update["count"];

			sum = aggMap.get(value).agg + +d[col3];
			//console.log(aggMap.get(value).agg + " " + d[col2]);
			
			if (choice = "avg"){
				agg1 = sum / count;
			} else if (choice = "sum") {
				agg1 = sum;
			} else if (choice = "max"){

			} else if (choice = "min"){

			}

			

			//console.log(sum + " " + count);
			update["agg"] = agg1;

			aggMap.set(value, update);
		

		} else {
			for(var i = 0; i <keys.length; i++) {
				var column = keys[i];					
				rData[keys[i]] = d[keys[i]];
			}
			rData["agg"] = +d[col3];
			rData["count"] = 1;
			aggMap.set(d[col1] + " " + d[col2], rData);
		}

				//console.log(aggMap.get(d[col1]));
	});
	return aggMap;
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

function addToMap (d, column1, column2, choice) {

	if (aggMap.has(column1)) { //if it has the name, increment
		aggMap.set(d.Name, 
			{
				Name: d.Name,
				Surface: "All",
				rank: d.rank,
				wins: winsMap.get(d.Name).wins + +d.wins,
				Gender: d.Gender
			}
		);
	} else { //insert the name
		aggMap.set(d.Name, 
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

	











