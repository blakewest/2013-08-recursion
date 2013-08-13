var json_parse = function () {

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser.

// We are defining the function inside of another function to avoid creating
// global variables.

     var at,     // The index of the current character    //index
         ch,     // The current characters                //cur_char
         escapee = {
             '"':  '"',
             '\\': '\\',
             '/':  '/',
             b:    'b',
             f:    '\f',
             n:    '\n',    
             r:    '\r',
             t:    '\t'
         },
         text,

         error = function (m) {

// Call error when something is wrong.

             throw {
                 name:    'SyntaxError',
                 message: m,
                 at:      at,
                 text:    text
             };
         },

         next = function (c) {                  //characterIexpectToBeCurrent

// If a c parameter is provided, verify that it matches the current character.

             if (c && c !== ch) {
                 error("Expected '" + c + "' instead of '" + ch + "'");
             }

// Get the next character. When there are no more characters,
// return the empty string.

             ch = text.charAt(at);              //charAt is same as saying text[x], but charAt returns empty string when it's out of range. 
             at += 1;                   //incrementing index.
             return ch;                 //get next character.
         },

         number = function () {

// Parse a number value.

             var number,
                 string = '';

             if (ch === '-') {
                 string = '-';
                 next('-');
             }
             while (ch >= '0' && ch <= '9') {
                 string += ch;
                 next();
             }
             if (ch === '.') {
                 string += '.';
                 while (next() && ch >= '0' && ch <= '9') {
                     string += ch;
                 }
             }
             if (ch === 'e' || ch === 'E') {
                 string += ch;
                 next();
                 if (ch === '-' || ch === '+') {
                     string += ch;
                     next();
                 }
                 while (ch >= '0' && ch <= '9') {
                     string += ch;
                     next();
                 }
             }
             number = +string;                  //this turns a string into a number!!! sweeet!!!
             if (isNaN(number)) {
                 error("Bad number");
             } else {
                 return number;
             }
         },

         string = function () {

// Parse a string value.

             var hex,
                 i,
                 string = '',
                 uffff;

// When parsing for string values, we must look for " and \ characters.

             if (ch === '"') {
                 while (next()) {                               //this increments next. can never actually be false. kinda unclear code...
                     if (ch === '"') {
                         next();
                         return string;                         //return me what you got after incrementing next. 
                     } else if (ch === '\\') {                          // here to line 124 is all about getting edge cases...
                         next();
                         if (ch === 'u') {
                             uffff = 0;
                             for (i = 0; i < 4; i += 1) {
                                 hex = parseInt(next(), 16);
                                 if (!isFinite(hex)) {
                                     break;
                                 }
                                 uffff = uffff * 16 + hex;
                             }
                             string += String.fromCharCode(uffff);
                         } else if (typeof escapee[ch] === 'string') {
                             string += escapee[ch];
                         } else {
                             break;
                         }
                     } else {
                         string += ch;                                // this is the meat, where you just add the next character to the string.
                     }
                 }
             }
             error("Bad string");
         },

         white = function () {

// Skip whitespace.

             while (ch && ch <= ' ') {              //ever char has ASCII code. blank space is no. 32. and this is really checking for anything less than the value of ' ', which is mostly garbagy chars.
                 next();
             }
         },

         word = function () {        //parseTrueFalseNull

// true, false, or null.

             switch (ch) {
             case 't':
                 next('t');
                 next('r');
                 next('u');
                 next('e');
                 return true;
             case 'f':
                 next('f');
                 next('a');
                 next('l');
                 next('s');
                 next('e');
                 return false;
             case 'n':
                 next('n');
                 next('u');
                 next('l');
                 next('l');
                 return null;
             }
             error("Unexpected '" + ch + "'");
         },

         value,  // Place holder for the value function.

         array = function () {

// Parse an array value.

             var array = [];

             if (ch === '[') {
                 next('[');
                 white();              //skip past any whitespace.
                 if (ch === ']') {
                     next(']');
                     return array;   // empty array
                 }
                 while (ch) {
                     array.push(value());   ..  // push the current char. We do NOT need to pass in curChar because value() already has access to it, cuz it's part of the outer scope.
                     white();                   //skip whitespace
                     if (ch === ']') {          // if we then see the empty bracket, we confirm it, and return the array. this lets return arrays that aren't empty. 
                         next(']');
                         return array;
                     }
                     next(',');                 //he assumes there is a comma here, because he recursively dealt with all of the content using value() a few lines above. 
                     white();
                 }
             }
             error("Bad array");
         },

         object = function () {

// Parse an object value.

             var key,
                 object = {};                   //sames 

             if (ch === '{') {
                 next('{');
                 white();
                 if (ch === '}') {
                     next('}');
                     return object;   // empty object
                 }
                 while (ch) {
                     key = string();            //get the key by recursively running string operation on it's starting char.
                     white();
                     next(':');                 //this better be a fucking : , and we also want to increment. 
                     object[key] = value();    //we know the key, so we just set it to value of current char. 
                     white();                   //clear white space.
                     if (ch === '}') {
                         next('}');
                         return object;
                     }
                     next(',');
                     white();
                 }
             }
             error("Bad object");
         };

     value = function () {                          //parseInput

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a reserved word.

         white();               // skipWhitespace
         switch (ch) {
         case '{':
             return object();    //parseObject
         case '[':
             return array();     //parseArray
         case '"':
             return string();    //parseString
         case '-':
             return number();    //parseNumber
         default:
             return ch >= '0' && ch <= '9' ? number() : word();    
         }
     };

// Return the json_parse function. It will have access to all of the above
// functions and variables.

     return function (source, reviver) {
         var result;

         text = source;
         at = 0;
         ch = ' ';
         result = value();
         white();
         if (ch) {
             error("Syntax error");
         }

// If there is a reviver function, we recursively walk the new structure,
// passing each name/value pair to the reviver function for possible
// transformation, starting with a temporary boot object that holds the result
// in an empty key. If there is not a reviver function, we simply return the
// result.

         return typeof reviver === 'function' ?
             function walk(holder, key) {
                 var k, v, value = holder[key];
                 if (value && typeof value === 'object') {
                     for (k in value) {
                         if (Object.hasOwnProperty.call(value, k)) {
                             v = walk(value, k);
                             if (v !== undefined) {
                                 value[k] = v;
                             } else {
                                 delete value[k];
                             }
                         }
                     }
                 }
                 return reviver.call(holder, key, value);
             }({'': result}, '') : result;

     };
}();
