"use strict";
window.Agg = (function () {
	function Agg () {
	}
		    
	var agg = {

		avg: function(data, avgCol, group) {
			console.log("avging");
			var avgMap = this.sum(data, avgCol, group, true);
			var countMap = this.count(data, group, true); //Should contain same keys as avg
			var avgMapKeys = avgMap.keys();
			var retArr = [];
			for (var currKey of avgMap.keys()) {
				var count = countMap.get(currKey);
				var sum = avgMap.get(currKey);
				
				//Create an Array of Objs
				var obj = {};
				var keySplit = currKey.split("_");
				for (var i = 0; i < group.length; i++) {

					obj[group[i]] = keySplit[i];
				}
				obj["Avg. " + avgCol] = parseInt(sum) / parseInt(count);
				retArr.push(obj);
			}
			return retArr;
		},

		sum: function(data, sumCol, group, internal) {
			var map = new Map();
			for (var i = 0; i < data.length; i++) {
				var row = data[i];
				var key = row[group[0]];
				for(var j = 1; j < group.length; j++){
					key += "_" + row[group[j]];
				}

				if (map.has(key)) {
					var currVal = map.get(key);
					map.set(key, currVal + parseInt(row[sumCol]));
				} else {
					map.set(key, parseInt(row[sumCol]));
				}
			} 

			//Create an Array of objects
			var objArr = [];
			for (var currKey of map.keys()) {
				var obj = {};
				var keySplit = currKey.split("_");
				for (var i = 0; i < group.length; i++) {
					obj[group[i]] = keySplit[i];
				}
				obj["Sum"] = parseInt(map.get(currKey));
				objArr.push(obj);
			}
			if (internal) {
				return map;
			} else {
				return objArr;
			}

			return map;
		},

		count: function (data, group, internal) {
			console.log("counting");
			var map = new Map(); //Map of col1 to total counts
			var size = group.length;
			for (var i = 0; i < data.length; i++) {
				var row = data[i];
				var key = row[group[0]];
				for (var j = 1; j < size; j++){
					var rowVal = row[group[j]];
					key += ("_" + rowVal);				
				}
				if (map.has(key)) {
					var mapVal = map.get(key);
					map.set(key, mapVal + 1);
				} else {
					map.set(key, 1);
				}		
			}

			//Convert to array of objects
			var objArr = [];
			for (var currKey of map.keys()) {
				var obj = {};
				var keySplit = currKey.split("_");
				for (var i = 0; i < group.length; i++) {
					obj[group[i]] = keySplit[i];
				}
				obj["Count"] = parseInt(map.get(currKey));
				objArr.push(obj);
			}
			if (internal) {
				return map;
			} else {
				return objArr;
			}
		},

		max: function(data, maxCol, group) {
			return maxMin(data, maxCol, group, true);
		},

		min: function(data, minCol, group) {
			return maxMin(data, minCol, group, false);
		},

		range: function (data, col) {
			//var map = new Map();

			var max, min;
			for (var i = 0; i < data.length; i++) {
				var row = data[i];
				if (i == 0) {
					max = min = row[col];
				}
				//console.log(data);
				
				// var key = row[group[0]];
				// for(var j = 1; j < group.length; j++){
				// 	key += "_" + row[group[j]];
				// }

				// if (map.has(key)) {
				// 	map.set(key, parseInt(row[col]));
				// } else {
				// 	map.set(key, parseInt(row[col]));
				// }

				//var currVal = map.get(key);
				if (max < row[col]) {
					max = parseInt(row[col]);
				}
				if (min > row[col]) {
					min = parseInt(row[col]);
				}
			}
			return [min, max];
		},

		sortAscending: function(data, sortCol) {

			data.sort(function(a,b) {
    			return a[sortCol] - b[sortCol];
			});
			return data;
		},

		sortDescending: function(data, sortCol) {
			data.sort(function(a,b) {
				return b[sortCol] - a[sortCol];
			});
			return data;
		},

		take: function (data, limit) {
			var copy = [];
			for (var i = 0; i < limit; i++){
				copy.push(data[i]);
			}
			return copy;
		},


		//Probably revmove this function by the end. It is just for us!
		review: function(data, col1, col2, value) {
			var map = [];

			for (var i = 0; i < data.length; i++) {
				if (data[i][col1] == value) {
					map.push(data[i][col2]);
				}
			}
			return map;
		}


	};

	//Helper function for the Min and Max functions
	function maxMin(data, col, group, max) {
		var map = new Map();
		for (var i = 0; i < data.length; i++) {
			var row = data[i];
			
			var key = row[group[0]];
			for(var j = 1; j < group.length; j++){
				key += "_" + row[group[j]];
			}


			if (map.has(key)) {
				var currVal = map.get(key);

				if (max && currVal < row[col]) {
					map.set(key, parseInt(row[col]));
				} else if (!max && currVal > row[col]) { //If max == false
					map.set(key, parseInt(row[col]));
				}
			} else {
				map.set(key, parseInt(row[col]));
			}
		}


		var objArr = [];
		for (var currKey of map.keys()) {
			var obj = {};
			var keySplit = currKey.split("_");
			for (var i = 0; i < group.length; i++) {
				obj[group[i]] = keySplit[i];
			}
			obj[col] = parseInt(map.get(currKey));
			objArr.push(obj);
		}
		return objArr;
	}


	return agg; //Returns the whole object with the functions
}());
