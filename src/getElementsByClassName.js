// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  //base case is looking at the classList of the element.. then checking if it matches the className;
  //if it does, we throw that element into our results array.
  //we'll recurse through by doing the check on every child, and all it's children, etc. 
  var results = [];
  bodyChildren = document.body.childNodes;
  
  function checkChildren(node){
  	var tempResult;
  	var eachChild = node.childNodes;

  	for (var j = 0; j < eachChild.length; j++) {
  		tempResult = [];
  		var checked_element = checkElement(eachChild[j]);
  		if (checked_element != undefined) {
  			tempResult.push(checked_element);
  		}  		
  		var checked_children = checkChildren(eachChild[j]);
  		if (checked_children != undefined) {
  			for (var m = 0; m < checked_children.length; m++) {
  				tempResult.push(checked_children[m]);
  			}
  		}

  		tempResult = tempResult.length === 0 ? undefined : tempResult;  	
  	}

  	return tempResult;
  }
  

  function checkElement (element) {
  	classArray = element.classList;
  	if (classArray != undefined) {
  		if (classArray.contains(className)) {
  			return element;
  		}
  	}

  	return undefined;
  } 

  for (var i = 0; i < bodyChildren.length; i++) {
  	var checked_element = checkElement(bodyChildren[i]);
  	if (checked_element != undefined) {
  		results.push(checked_element);
  	}

  	var checked_children = checkChildren(bodyChildren[i]);
  	if (checked_children != undefined) {
  		for (var l = 0; l < checked_children.length; l++) {
  			results.push(checked_children[l]);
  		}
  	}  	
  }

  return results;
};
