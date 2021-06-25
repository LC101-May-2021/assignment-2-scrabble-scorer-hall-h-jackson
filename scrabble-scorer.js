

const input = require("readline-sync");

function initialPrompt() {
    userInput = input.question("Let's play some scrabble!\n\nEnter a word: ");
}

let userInput = "";
let vowels = ['A', 'E', 'I', 'O', 'U'];
let sometimesY = ['Y'];

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }



// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function simpleScore(word) {
    return word.length
}

function vowelBonusScore(word) {
    word = word.toUpperCase();
    score = 0;

    for (let j = 0; j < word.length; j++) {
        if (vowels.includes (word[j]) || sometimesY.includes (word[j])) {
            score = score + 3;
        } else {
            score = score + 1;
        }    
    } 
    return score;
}

function scrabbleScore(word) {
    let wordScore = 0;

	for (let i = 0; i < word.length; i++) {
		for (letters in newPointStructure) {
			if (letters===(word[i].toLowerCase())) {
				wordScore += Number(newPointStructure[letters]);
			}
		}
	}
	return wordScore;
}

const scrabbleScoring = {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: function(word) {
        return scrabbleScore(word);
    }
};

const simpleScorer = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: function(word) {
        return simpleScore(word);
    }
};

const vowelBonusScorer = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: function(word) {
        return vowelBonusScore(word);
    }
};

const scoringAlgorithms = [scrabbleScoring, simpleScorer, vowelBonusScorer];

function scorerPrompt() {
    let userScorerChoice = input.question("Which scoring method you would like?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0,1, or 2: ");
    if (userScorerChoice == 0) {
        console.log("Score: " + simpleScore(userInput));
    } else if (userScorerChoice == 1) {
        console.log("Score: " + vowelBonusScore(userInput));
    } else if (userScorerChoice == 2) {
        console.log("Score: " + scrabbleScore(userInput));
    }
}

function transform(object) {
    let newPointObj = {};
    for (points in object) {
        for (letters of object[points]) {
            newPointObj[letters.toLowerCase()] = Number(points);
        };
    };
    return newPointObj;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;


function runProgram() {
   initialPrompt(userInput);
   scorerPrompt();
   console.log(scrabbleScore(userInput));
 
}









// Don't write any code below this line //

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

