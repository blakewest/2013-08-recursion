// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

//converts object to JSON notation representing it. 
var stringifyJSON = function (obj) {                            //this is missing functiong filtering, but 
  if(typeof obj === 'string') {
    return '"' + obj + '"'
  }else if (_.isArray(obj)) {
    return '[' + _.map(obj, stringifyJSON.join(',')) + ']';
  }else if (obj && typeof obj === 'object')  {
    return '{' + _.map(obj, function(item, key) {
      return stringifyJSON(key) + ':' + stringifyJSON(item);
    }).join(',') + '}';       
  }else {
    return obj + '';
  }
};
