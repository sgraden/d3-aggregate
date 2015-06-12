"use strict";
window.Agg = (function () {
	function Agg () {
	}
		    
	var agg = {
		/**
		 * Loop through a dataset (Array of Objects with columns as fields) 
		 * to calculate the average value for a column. Provide the other
		 * columns to group by. Will return an Array of objects in the same layout as given
		 * 
		 * @param  {Array[object]} 	data   	Array of objects. Fields in objects are the columns from dataset
		 * @param  {String} 		avgCol 	The column that will be averaged
		 * @param  {Array[String]} 	group  	An array of column names in the format of a string
		 * @return {Array[object]}  		An array of objects with the grouped and average column as fields.      
		 */
		avg: function(data, avgCol, group) {
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

		/**
		 * Loop through a dataset to calculate the sum for a given column. Provide
		 * an array of column names to group the data by.
		 * 
		 * @param  {Array[object]} 	data   			Array of objects. Fields in objects are the columns from dataset
		 * @param  {String} 		sumCol  		Column to sum
		 * @param  {Array[String]} 	group  			An array of column names in the format of a string
		 * @param  {Boolean} 		internal 		Whether the function is being called internally or not
		 * @return {Array[object] || map<String> = Sum}     Depending on if it is internal call or not, this function will return an Array of objects or a map
		 */
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

		/**
		 * Count the number of occurences of a set of values. Can be grouped in order to specify
		 * the values being searched for.
		 * 
		 * @param  {Array[object]} 	data   					Array of objects. Fields in objects are the columns from dataset
		 * @param  {Array[String]} 	group  					An array of column names in the format of a string
		 * @param  {Boolean} 								internal Whether the function is being called internally or not
		 * @return {Array[object] || map<String> = Sum}     Depending on if it is internal call or not, this function will return an Array of objects or a map
		 */
		count: function (data, group, internal) {
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

		/**
		 * Find the maximum set of values based on a specific column. Allows the grouping of elements if desired.
		 * 
		 * @param  {Array[object]} 	data   		Array of objects. Fields in objects are the columns from dataset
		 * @param  {String} 		maxCol   	Column to find the max in
		 * @param  {Array[String]} 	group  		An array of column names in the format of a string that will be used to group by
		 * @return {Array[object]}				An array of objects containing the Maximum set of values for the grouped data
		 */
		max: function(data, maxCol, group) {
			return maxMin(data, maxCol, group, true);
		},

		/**
		 * Find the Minimum set of values based on a specific column. Allows the grouping of elements if desired.
		 * 
		 * @param  {Array[object]} 	data   		Array of objects. Fields in objects are the columns from dataset
		 * @param  {String} 		minCol   	Column to find the Min in
		 * @param  {Array[String]} 	group  		An array of column names in the format of a string that will be used to group by
		 * @return {Array[object]}				An array of objects containing the minimum set of values for the grouped data
		 */
		min: function(data, minCol, group) {
			return maxMin(data, minCol, group, false);
		},

		/**
		 * Find the minimum and the maximum of a dataset based on the column to search through
		 * 
		 * @param  {Array[object]} 	data 	Array of objects. Fields in objects are the columns from dataset
		 * @param  {String} 		col  	String of column to find the min and max of
		 * @return {Array[min, max]}      	An array of numbers. 0=Min 1=Max	
		 */
		range: function (data, col) {
			var max, min;
			for (var i = 0; i < data.length; i++) {
				var row = data[i];
				if (i == 0) { //Set the initial values for max and min
					max = min = row[col];
				}

				if (max < row[col]) { //If max is less than current reset
					max = parseInt(row[col]);
				}
				if (min > row[col]) { //If min is greater than current reset
					min = parseInt(row[col]);
				}
			}
			return [min, max];
		},

		/**
		 * Sort the rows in the dataset based on a column and the direction you would like to sort by.
		 * Works on number and strings.
		 *
		 * Defaults to Descending
		 * 
		 * @param  {Array[object]} 	data 		Array of objects. Fields in objects are the columns from dataset
		 * @param  {String} 		sortCol   	String of column name to sort by
		 * @param  {String} 		direction 	Accepts "asc" to sort in an Ascending style or "desc" to sort Descending.
		 * @return {Array[object]}           	Array of  sorted objects. Fields in objects are the columns from dataset
		 */
		sort: function(data, sortCol, direction) {
			var dataCopy = data.slice(); //Creates a copy of the data
			if (!direction) { //If direction is not set then make it an empty string
				direction = "";
			}
			if (direction.toLowerCase() == "asc") { //If Ascending
				dataCopy.sort(function(a,b) {
					var aVal = a[sortCol];
					var bVal = b[sortCol];
					if (typeof aVal == "string") { //Important to match caps
						aVal = aVal.toLowerCase();
						bVal = bVal.toLowerCase();
					}
					if(aVal < bVal) return -1;
				    if(aVal > bVal) return 1;
				    return 0;
				});
			} else { // if Descending or just not set
				dataCopy.sort(function(a,b) {
					var aVal = a[sortCol];
					var bVal = b[sortCol];
					if (typeof aVal == "string") { //Important to match caps
						aVal = aVal.toLowerCase();
						bVal = bVal.toLowerCase();
					}
					if(aVal > bVal) return -1;
				    if(aVal < bVal) return 1;
				    return 0;
				});
			}
			return dataCopy;
		},

		/**
		 * Reduce the amount of rows in your dataset. Simply grabs the top rows of the dataset and returns a new array of them. If limit is greater than the length of data then will return original data.
		 * 
		 * @param  {Array[object]} 	data 	Array of objects. Fields in objects are the columns from dataset
		 * @param  {Number} 		limit	The number of rows you want to keep.
		 * @return {Array[object]} 			An array of objects. Fields in objects are the columns from dataset. Number of objects based on "limit"
		 */ 
		take: function (data, limit) {
			if (limit < data.length) {
				var copy = [];
				for (var i = 0; i < limit; i++){
					copy.push(data[i]);
				}
				return copy;
			} else { //IF the user asks for more rows then juest return the old array
				return data;
			}
			
		},

		/**
		 * Loops through the dataset and searches for exact matching data between the filterCol and filerValue parameters.
		 * Only keeps rows which meet all the filter values exactly.
		 *
		 * filterCol and filterValue need to match column to value positioning within the arrays.
		 * 
		 * @param  {Array[object]} 	data 		Array of objects. Fields in objects are the columns from dataset
		 * @param  {Array[String]} filterCol   	Array of column names to match with the values
		 * @param  {Array[values]} filterValue 	Array of values to check for in each provided column
		 * @return {Array[objects]}            	Array of objects. Fields in objects are the columns from dataset
		 */
		filter: function (data, filterCol, filterValue){
			var filterData = [];

			for (var i = 0; i < data.length; i++) { //Loop through data
				var row = data[i];
				var saveVal = true;
				for (var j = 0; j < filterCol.length; j++) { //For each data, loop through columns and test against same value
					var col = filterCol[j];
					if (row && row[col]) { //If the row exists and row at col exists
						var allowVal = filterValue[j];
						if (row[col] != allowVal) { //if any column does not pass then don't save
							saveVal = false;
						}
					}
				}
				if (saveVal) { //If all filters passed then save
					filterData.push(row);
				}
			}

			return filterData;
		}
	};

	/*Functions to be used internally only*/

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
