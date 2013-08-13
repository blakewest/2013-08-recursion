// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	//key concepts:
	// have an index, and a current character
	// has some kind of next function to increment on the character. 
	// each type of thing you encounter sends you into another recursive thing. 
	// use switch statement to handle each char you encounter. 
	// types are numbers, strings, objects, arrays, resereved words (booleans and null), and white space.
	// you CAN call <= or >= on string numbers like '2' or '9', because of the ASCII encodings. 
	// using number = +string will turn a string into a number. pretty rad.

	var index = 0;
	var currentChar = json[0];

	var parseInput = function() {
		switch(currentChar) {
			case "{" :
			  return parseObject(currentChar);
			  break;
			case "[" :
			  return parseArray(currentChar);
			  break;
			case '"' :
			  return parseString(currentChar);
			  break;
			default :
			  return currentChar > '0' && currentChar < '9' ? parseNumbers(currentChar) : parseReservedWord(currentChar);

		}
	};

	var nextChar = function(characterIExpect) {
		characterIExpect = characterIExpect || currentChar;
		if (characterIExpect != currentChar) throw "Expected " + characterIExpect + " but instead saw " + currentChar;

		index += 1;
		currentChar = json.charAt(index);
		return currentChar;
	}

	var parseString = function(character) {
		//this is only triggered after finding a " 
		var string = '"';                    //start off the string with quote, because I know that's what got passed in as character.  
		nextChar();
		while (true) {                       //just keep going as long as you can.
			if (currentChar === '"') {
				nextChar();
				return string;
			}else {
				string += currentChar;
				nextChar();
			}

		}
	};

	var parseNumbers = function(character) {
		debugger
		var numberString = character;
		whiteSpace();
		nextChar();
		while (currentChar >= '0' && currentChar <= '9') {
          numberString += currentChar;
          nextChar();
        }
        nextChar();
        return +numberString;        
    };

	var parseObject = function(character) {
		var obj = {};
		nextChar();
		whiteSpace();
		if (currentChar === "}") {
			return obj;
		}
		var key = '';
		while (currentChar != ':') {
			key = parseString();
		}

	};

	var parseArray = function(character) {
		var array = [];
	}

	var parseReservedWord = function(character) {
		//do stuff
	}

	var whiteSpace = function(character) {
		if (character <= ' ') {
			nextChar();
			whiteSpace(character);
		}else {return}
	}

	var jsonOBJ = parseNumbers(json[0]);
	// while (index < json.length) {
	// 	jsonOBJ = parseInput(json[index]);
	// }

	return jsonOBJ;
};
