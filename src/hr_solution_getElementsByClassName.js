// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className, node) {               
    var root = root || document;
    var results = results;
    var children = root.childNodes;
    var matchingNodes = [];

    if(hasClass(className, node)) {                                 //
        results.push(node);           
      }

    for(var i = 0; i < children.length; i++) {
      results = results.concat( getElementsByClassName(className, children[i]) );     //concat brings together two arrays as one. Kinda like +=, except for arrays.         
    }

    return results;                                               //could also pass in results at the top, and just set a default for results at the beginning. 
};

var getElementsByClassName2 = function(className) {
  results2 = hasClass(node, className)  ? [node] : [];
  return results.concat(_(node.childNodes).map(seriouslygetElementsByClassName2).flatten() );

  var seriouslygetElementsByClassName2 = function (node) {               
      hasClass(className, node) && results.push(node);
      _(node.childNodes).each(seriouslygetElementsByClassName2);
    };

  seriouslygetElementsByClassName2(document);

  return results2;
};
