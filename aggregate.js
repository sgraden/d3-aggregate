"use strict";
window.Agg = (function () {
	function Agg () {
	}
		    
	var agg = {
		/*
			Groups by all columns and averages the last column provided.
		 */
		avg: function(data, col1, col2) {
			console.log("avging");
			var avgMap = this.sum(data, col1, col2);
			var countMap = this.count(data, col1); //Should contain same keys as avg

			var avgMapKeys = avgMap.keys();
			for (var currKey of avgMap.keys()) {
				var count = countMap.get(currKey.toLowerCase()); //Compare to lower case in count/avg
				var sum = avgMap.get(currKey);
				avgMap.set(currKey, sum / count);
			}

			return avgMap;//convertMapToArray(avgMap);
		},

		sum: function(data, col1, col2) {
			console.log("summing");
			var map = new Map();
			for (var i = 0; i < data.length; i++) {
				var row = data[i];
				var rowCol1 = row[col1];
				if (map.has(rowCol1)) {
					var currVal = map.get(rowCol1);
					//console.log(currVal);
					map.set(rowCol1, parseInt(currVal) + parseInt(row[col2]));
				} else {
					map.set(rowCol1, row[col2]);
				}
			} 
			return map;
		},

		max: function(data, col1, col2, col3) {
			console.log("maxing");
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
		},

		/*
		Return entire row for the min value found with the given column
		 */
		min: function(data, col1, col2, col3) {
			console.log("mining");
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
		},

		/**
		 * Function that searches through and combines the given data based
		 * on the column to pay attention to and, if given, the exact value the user
		 * is searching for. Returns either a map of all unique values in the column
		 * or the count for a single value that was given.
		 * @param  Array[objects] 	data  	An array of objects with col names as key values
		 * @param  String 			col1  	The column to be counted by
		 * @param  String 			values 	Not mandatory. A specific value the ge the count for
		 * @return Int or Array[objects]
		 */
		count: function (data, col1, value) {
			console.log("counting");
			var findVal = value ? true : false; //If specific value was passed or not
			var map = new Map(); //Map of col1 to total counts
			//var singleCount = 0; //Count for the single value passed 
			for (var i = 0; i < data.length; i++) {
				var row = data[i];
				/*if (findVal && row[col1] == value) {
					singleCount++;
				} else {*/
				var rowVal = row[col1].toLowerCase(); //Helps with caps
				if (map.has(rowVal)) {
					var mapVal = map.get(rowVal);
					map.set(rowVal, mapVal + 1);
				} else {
					map.set(rowVal, 1);
				}
				//}
			}
			if (findVal) {
				return map.get(value.toLowerCase()); //Compare the lower case val
			} else {
				return map;
			}
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

//Kind of stopped using because I wasn't sure exactly what was happening...
//I now realize how this was a single function to try to fix the issue of
//having to keep doing the whole if map has x loop
function aggregate(data, col1, col2, choice) {
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

	











