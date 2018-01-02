function Game(guess) {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.playersGuessSubmission = function(guess) {
	this.playersGuess = guess;

	if ((isNaN(guess)) || guess < 1 || guess > 100) {
		alert('Invalid Guess!');
		throw ('That is an invalid guess.');
		console.log('error should have been thrown');
	}
	this.playersGuess = guess;
	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	if (this.playersGuess === this.winningNumber) {
		$('#hint, #submit').prop("disabled",true);
        $('#title').text("Press the Reset button to play again.").css({'color': 'yellow'});
		return 'You Win! The number was ' + this.winningNumber + '.';
	} else {
        if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
        	return 'You have already guessed that number :('
        } else {
        	this.pastGuesses.push(this.playersGuess);
        	$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);

        	if (this.pastGuesses.length === 5) {
        		$('#hint, #submit').prop("disabled",true);
                $('#title').text("Press the Reset button to play again!")
        		return 'You Lose.';
        	} else {
        		var diff = this.difference();

        		if(this.isLower()) {
        			$('#title').text('Guess Higher!');
        		} else {
                    $('#title').text('Guess Lower!');
        		}
        		if (diff < 10) {
        			return 'You\'re burning up!';
        		} else if (diff < 25) {
        			return 'You\'re lukewarm.';
        		} else if (diff < 50) {
        			return 'You\'re a bit chilly.';
        		} else {
        			return 'You\'re ice cold!';
        		}
        	}
        }
	}
}

Game.prototype.difference = function() {
	return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
}

Game.prototype.provideHint = function() {
	var hintArray = [];
	hintArray.push(this.winningNumber);
	hintArray.push(generateWinningNumber());
	hintArray.push(generateWinningNumber());
	return shuffle(hintArray);
}

function generateWinningNumber() {
	return Math.floor(Math.random() * (100) + 1);
}

function shuffle(array) {
	var m = array.length;
	var t;
	var i;

	while (m) {
		i = Math.floor(Math.random() * m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

function newGame() {
	return new Game();
}

function makeGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    $('#subtitle').text(output).css({'color': 'orange'});
}

$(document).ready(function() {
	var game = new Game();

	$('#players-input').focus();

	$('#submit').click(function(e) {
        makeGuess(game);
    });

    $('#players-input').keypress(function(event) {
    	if(event.which == 13) {
    		makeGuess(game);
    	}
    });
    $('#hint').click(function(e) {
    	var hint = game.provideHint();
    	$('#subtitle').text('The winning number is ' + hint[0] + ', ' + hint[1] + ', or ' + hint[2] + '.');
    })
    $('#reset').click(function(e) {
    	game = new Game();
    	$('#title').text('Play the Guessing Game!').css({'color': 'white'});
    	$('#subtitle').text('Guess a number between 1 and 100.').css({'color': 'white'});
    	$('.guess').text('-');
    	$('#hint, #submit').prop("disabled", false);
    });
});







