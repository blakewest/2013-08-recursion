// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

//converts object to JSON notation representing it. 
var stringifyJSON = function (obj) {

  var stringified = ""

  if (Object.prototype.toString.call(obj) === "[object Null]") {											// checking up front for null/undefined/function edge cases
  	return stringified += "null";
  }else if (Object.prototype.toString.call(obj) === "[object Undefined]" || typeof obj === "function") {
  	return stringified;
  }

  if (typeof obj != "object") {																//checking for primitive types. This really is the base-case. If we have these
  	if (typeof obj === "string") {															//we can just return it straight up. 
  		return stringified += '"' + obj.toString() + '"';
  	}else {
  		return stringified += obj.toString();
	 }
  }
  																							//we now know we have an object of some kind
  if (Object.prototype.toString.call(obj) === "[object Object]" ) {                			//this tests if it's either an empty array or object, and returns appropriately.
  	if (Object.keys(obj).length === 0){
  		return stringified += "{}";
  	}
  }else if (obj.length === 0) {
  	return stringified += "[]";
  }

  if (Object.prototype.toString.call(obj) === "[object Array]" ) {							//if we have an array, do the appropriate thing.
  		stringified += "[";																	//this kicks off any transcription of arrays
  		for (var i = 0; i < obj.length; i++) {												//cycling through each item in the array and recursing down with our funciton
  			var contents = stringifyJSON(obj[i]);
  			stringified += contents;
  			if (i < obj.length - 1) {
  				stringified += "," ;														//puts in comma whenever it's not the last item in the array.
  			}
  			
  		}
  		stringified += "]";																	//seals off the array.
  	}else {
  		stringified += "{"																	//this kicks off any object transcription
  		for (item in obj) {
  			var itemRef = item;																//this is only here cuz var item gets re-written if an object contains another object. 
  			var contents = stringifyJSON(obj[item]);										//finds out and stringifies the value of the key 

  			if (contents != "") {															//if we didn't get back any null/undefined garbage, then continue on. sort of like "try" 
  				stringified += stringifyJSON(itemRef) + ":" ;								//puts in the key plus a ":" + the contents, and then if it's not the last item, we'll
  				stringified += contents;													//put in a comma too.
  				if (itemRef != Object.keys(obj)[Object.keys(obj).length - 1]) {
  					stringified += ",";
  				}
  			}
  		}
  		stringified += "}";																	//close off the object
  	 }

  return stringified																		//final product
};
