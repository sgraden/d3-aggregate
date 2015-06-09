"use strict";
window.Agg = (function () {
	function Agg () {
	}
		    
	var agg = {
		avg: function(data, col1, col2, col3) {
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
					agg1 = sum / count;
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
			var counter = 0;
			console.log(aggMap);
			for (var k in aggMap) {
				console.log("hello");
				/*var obj = toObject(aggMap[k]);
				objectArray[counter] = obj;
				console.log("test");
			  //objectArray[counter] = aggMap.get(k);
			  
			  counter++; */
			}



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

//Have user define the file and the aggregate choice 
function getColumns(fileName, column1, column2, choice) {
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
		//console.log(columns);		
		//console.log(headerNames);
		tennis.forEach(function(d) { //Convert data to Numbers
			//console.log(d);

			var count = 0;
			var sum = 0;
			var average = 1;
			var min = 0;
			var max = 0;
			var agg = 0;
			for(i = 0; i <headerNames.length; i++) {
				//columns.get(headerNames[i]).push(d[headerNames[i]]);
				var value = d[headerNames[i]];

				if(aggMap.has(column1)){
					count++;
					sum += aggMap.get(column1);
					if (choice == "sum" && value == "column2"){
						agg = sum;
					} else if (choice == "count" && value == "column2"){
						agg = count;
					} else if (choice == "average" && value == "column2"){
						agg = sum / count;
					} else if (choice == "min" && value == "column2") {

					} else if (choice == "max" && value == "column2"){

					}

					aggMap.set(d[column1], {
						choice: agg,
						headerNames: value,
					})

				} else {
					aggMap.set(d[column1], {
						choice: agg,
						headerNames: value,
					})
				}

				
			}
			//addToMap(d, column1, column2, choice);
		});
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

	











