// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {

  if (typeof obj === 'string') {
    return '"' + obj.toString() + '"';
  } else if (_.isArray(obj)) {
    return '[' + _.map(obj, stringifyJSON(obj)).join(',') + ']';
  }
};
