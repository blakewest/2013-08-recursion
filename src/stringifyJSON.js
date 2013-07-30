// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

//converts object to JSON notation representing it. 
var stringifyJSON = function (obj) {
  // your code goes here
  //converts anything to JSON. Probably need to know what we're looking at first.

  //check type. If X type and certain conditions are met, do Y --> that's our base case. 
  //do a for loop of the passed in object. call stringify on the item in the for loop. This will Recurse down until you've found the lowest case. 
  
  //if typeof obj = object, you'll def need to go down another level.
  // if typeof obj = string, number, boolean or other primitive, then you can safely just make that the string.
  var stringified = ""

  if (Object.prototype.toString.call(obj) === "[object Null]") {
  	return stringified += "null";
  }else if (Object.prototype.toString.call(obj) === "[object Undefined]" || typeof obj === "function") {
  	return stringified;
  }

  if (typeof obj != "object") {
  	if (typeof obj === "string") {
  		return stringified += '"' + obj.toString() + '"';
  	}else {
  		return stringified += obj.toString();
	 }
  }
  
  if (Object.prototype.toString.call(obj) === "[object Object]" ) {
  	if (Object.keys(obj).length === 0){
  		return stringified += "{}";
  	}
  }else if (obj.length === 0) {
  	return stringified += "[]";
  }

  if (Object.prototype.toString.call(obj) === "[object Array]" ) {
  		stringified += "[";
  		for (var i = 0; i < obj.length; i++) {
  			var contents = stringifyJSON(obj[i]);
  			stringified += contents;
  			if (i < obj.length - 1) {
  				stringified += "," ;
  			}
  			
  		}
  		stringified += "]";
  	}else {
  		stringified += "{"
  		for (item in obj) {
  			var itemRef = item;
  			var contents = stringifyJSON(obj[item]);

  			if (contents != "") {
  				stringified += stringifyJSON(itemRef) + ":" ;
  				stringified += contents;
  				if (itemRef != Object.keys(obj)[Object.keys(obj).length - 1]) {
  					stringified += ",";
  				}
  			}
  		
  			
  			
  		}
  		stringified += "}";
  	 }

  return stringified
};


// //
// 325
// down vote
// accepted
// The method given in the ECMAScript standard to find the class of Object is to use the toString method from Object.prototype.

// if( Object.prototype.toString.call( someVar ) === '[object Array]' ) {
//     alert( 'Array!' );
// }
// Or you could use typeof to test if it is a String:

// if( typeof someVar === 'string' ) {
//     someVar = [ someVar ];