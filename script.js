$(document).ready(function () {
	if (document.cookie === "") {
		$("#information").slideDown(600);
	}
	// The current card being shown.
	var current = 0;
	// This is the current set we're working with. At the beginning, it's just a combination of "old" and "after". Note that "after"
	// really should be called "new", but that's a javascript reserved word, so I couldn't. I use ".slice()" to copy the array by value
	// so that when I shuffle it, the real one stays in order.
	cards = old.concat(after).slice();
	// This is just an easier to check indicator of which set we're on.
	current_set = "all";
	// What side we're on. Either "front" or "back". Anything else will throw an error. This is case-sensitive. Only use lowercase.
	var side = "front";
	// I defined the variables old and after as an array of objects with 3 attributes each, front, back, and prefetch. I make them
	// programmatically with a python script, so they're saved in separate files, old.js for old, and new.js for after. That's why they're not
	// here and your editor might yell at you for talking about them.
	// Initializes the first card on screen.
	draw(current, side);
	$("#left").click(function () {
		// I need this if/else to cover wrapping around to the end if you go left from card 0.
		if (current !== 0) {
			current--;
		} else {
			current = cards.length - 1;
		}
		// Always show the front side of a card when you switch to it.
		side = 'front';
		// This actually puts the stuff you just did on the page, lest it just be in this script but invisible to the user.
		draw(current, side);
	});
	// See above.
	$("#right").click(function () {
		if (current !== cards.length - 1) {
			current++;
		} else {
			current = 0;
		}
		side = 'front';
		draw(current, side);
	});
	// Flips the card.
	$("#center").click(function () {
		if (side === 'front') {
			side = "back";
		} else {
			side = "front";
		}
		draw(current, side);
	});
	// This function governs everything that happens when some key is pressed.
	$(document).keydown(function (event) {
		// Key 32 is space; if you press it, flip the card (i.e. do what would be done if you clicked the center.)
		if (event.which === 32) {
			$("#center").click();
		}
		// Key 39 is right.
		else if (event.which === 39) {
			$("#right").click();
		}
		// Key 37 is left.
		else if (event.which === 37) {
			$("#left").click();
		}
	});
	// This shuffles the cards.
	$("#random").click(function () {
		cards = shuffle(cards);
		current = 0;
		side = "front";
		draw(current, side);
	});
	// This resets the set of cards back to its ordered version. It chooses the one you were using before, so you don't
	// have to pick again.
	$("#unshuffle").click(function () {
		switch (current_set) {
		case "old":
			cards = old.slice();
			break;
		case "new":
			cards = after.slice();
			break;
		case "all":
			cards = old.concat(after);
			break;
		}
		current = 0;
		side = 'front';
		draw(current, side);
	});
	// This switches to the old set of cards.
	$("#old").click(function () {
		cards = old.slice();
		current_set = "old";
		side = 'front';
		current = 0;
		draw(current, side);
	});
	// This switches to the new set of cards.
	$("#new").click(function () {
		cards = after.slice();
		current_set = "new";
		side = 'front';
		current = 0;
		draw(current, side);
	});
	// This shows both sets together.
	$("#all").click(function () {
		cards = old.concat(after).slice();
		current_set = "all";
		side = "front";
		current = 0;
		draw(current, side);
	});
	// This hides the little paragraph of information I have at the top.
	$("#hider").click(function () {
		$("#information").slideUp();
	});
	$("#forever").click(function () {
		$("#hider").click();
		var expiration = new Date();
		expiration.setFullYear(expiration.getFullYear() + 1);
		document.cookie = "hidden=true;expires=" + expiration.toGMTString();
	});
	// Prefetches all the images so they don't have to be loaded in real time.
	for (var i = 0; i < cards.length; i++) {
		$("#pre").append(cards[i.toString()].prefetch);
	}
});
// Puts the current arrangement on the screen.
function draw(current, side) {
	$("#card").html(cards[current][side]);
	$("#counter").html((current + 1).toString() + ' of ' + cards.length.toString());
	// This realigns the window so that it fits better on the screen.
	$(".tall").css("height", $(window).height() * .85);
	$("img").css("max-height", $(window).height() * .80);
}

// Borrowed from https://stackoverflow.com/a/6274398/2570117
function shuffle(array) {
	var counter = array.length,
	temp,
	index;
	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		index = Math.floor(Math.random() * counter);
		// Decrease counter by 1
		counter--;
		// And swap the last element with it
		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}
