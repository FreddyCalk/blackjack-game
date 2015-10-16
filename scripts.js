var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;
var winCount = 0;

function bust(who){
	if(who==='player'){
		document.getElementById('message').innerHTML = "You have busted, better luck next time";
	}else{
		document.getElementById('message').innerHTML = "The dealer has busted, you win!";
	}

}

function calculateTotal(hand, who){
	var total = 0;
	for(i=0;i<hand.length;i++){
		var cardValue = Number(hand[i].slice(0,hand[i].indexOf('<')));
		if(cardValue>10){
			cardValue = 10
		}else if((cardValue===1)&&(hand.length<=2)){
			cardValue=11;
		}
		total += cardValue;
	}
	var idWhoToGet = who+'-total';
	document.getElementById(idWhoToGet).innerHTML = total;

	if(total>21){
		bust(who);	
	}
	return total;
}

function checkWin(){
	var playerTotal = calculateTotal(playerHand,'player');
	var dealerTotal = calculateTotal(dealerHand,'dealer');
	var winner;
	if(((playerTotal>dealerTotal)&&(playerTotal<=21))||((dealerTotal>21)&&(playerTotal<=21))){
		// Player Wins!
		winner = 'player';
	}else if(((playerTotal === dealerTotal)&&(playerTotal<=21))||((playerTotal>21)&&(dealerTotal>21))){
		winner = 'tie';
		// Push
	}else{
		winner = 'dealer';
	}
	if(winner === 'player'){
		document.getElementById('message').innerHTML = "You Win!";
		winCount++;
	}else if(winner === 'dealer'){
		document.getElementById('message').innerHTML = "You Lose!";
		winCount--;
	}else if(winner === 'tie'){
		document.getElementById('message').innerHTML = "Push!";
	}

	document.getElementById('win-count').innerHTML = winCount;
	
}

function deal(){
// Shuffled deck from function shuffleDeck
	reset();
	deck = shuffleDeck();
	playerHand=[deck[0],deck[2]];
	dealerHand=[deck[1],deck[3]];
	placeInDeck = 4;

	placeCard(playerHand[0],'player','one');
	placeCard(dealerHand[0],'dealer','one');
	placeCard(playerHand[1],'player','two');
	placeCard(dealerHand[1],'dealer','two');

	calculateTotal(playerHand, 'player');
	calculateTotal(dealerHand, 'dealer');

	document.getElementById('dealer-card-one').className += ' empty'; 
	document.getElementById('dealer-card-one').innerHTML = '-';
	document.getElementById('dealer-total').innerHTML = ' - ';
	document.getElementById('draw-button').disabled = true;
	document.getElementById('stand-button').disabled = false;
	document.getElementById('hit-button').disabled=false;
}

function hit(){
	var slot;
	var playerTotal = calculateTotal(playerHand,'player');
	if(playerTotalCards === 2){slot = "three";}
	else if(playerTotalCards===3){slot = "four";}
	else if(playerTotalCards===4){slot = "five";}
	else if(playerTotalCards===5){slot = "six";}
	if(playerTotal>21){
		document.getElementById('hit-button').disabled = true;
	}
	placeCard(deck[placeInDeck], 'player', slot);
	playerHand.push(deck[placeInDeck]);
	playerTotalCards++;
	placeInDeck++;
	calculateTotal(playerHand,'player')

}

function placeCard(card,who,slot){
	var currentId = who + '-card-' + slot;
	document.getElementById(currentId).className = "card";
	document.getElementById(currentId).innerHTML = card;
	
}

function reset(){
	deck = [];
	placeInDeck = 0;
	playerTotalCards = 2;
	dealerTotalCards = 2;
	playerHand = [];
	dealerHand = [];
	var cards = document.getElementsByClassName('card');
	for(i=0;i<cards.length;i++){
		cards[i].className = cards[i].className + ' empty';
		cards[i].innerHTML = '-';


	}
	document.getElementById('message').innerHTML = " ";
}


function shuffleDeck(){
	var deck =[];
	//fill our deck, in order (for now)
	//suit 
	var suit = " ";
	for(s = 1; s <= 4; s++){
		if(s === 1){
			suit = "<img style='width: 30px; height: 30px;' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/SuitHearts.svg/208px-SuitHearts.svg.png'>";
		}else if(s === 2){
			suit = "<img style ='width:30px; height: 30px;' src='https://pixabay.com/static/uploads/photo/2013/07/12/12/01/suit-of-spades-145116_640.png'>";
		}else if(s === 3){
			suit = "<img style ='width:30px; height: 30px;' src='http://www.clker.com/cliparts/h/Y/J/D/X/d/diamond-md.png'>";
		}else if(s === 4){
			suit = "<img style = style ='width:30px; height: 30px;' src='https://img0.etsystatic.com/015/0/5224796/il_170x135.462214460_doo3.jpg'>";
		}
		//card number
		for(i = 1; i <= 13; i++){
			deck.push(i+suit);
		}
	}

	// var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	var numberOfTimesToShuffle = 2000;

// Math.random() // Create a random 16 digit number between 0 and 1
// //eg .89745839857324985
// .89745839857324985 * 500 = 450.745839857324985
// 450.745839857324985 + 500 = 950.745839857324985
// 950

	//Shuffle the deck
	for(i = 0; i < numberOfTimesToShuffle; i++){
		//pick 2 random cards from the deck. And switch them.
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}
	//Shuffled Deck
	return deck;
}

// This needs help with actually removing the cards that are in the slots after the first two...

function stand(){
	var dealerHas = calculateTotal(dealerHand, 'dealer');
	var slot;
	while(dealerHas<17){
		if(dealerTotalCards===2){slot = "three";}
		else if(dealerTotalCards===3){slot = "four";}
		else if(dealerTotalCards===4){slot = "five";}
		else if(dealerTotalCards===5){slot = "six";}
		
		placeCard(deck[placeInDeck],'dealer',slot);
		dealerHand.push(deck[placeInDeck]);
		dealerHas = calculateTotal(dealerHand,'dealer');
		placeInDeck++;
		dealerTotalCards++;
	}
	document.getElementById('dealer-total').innerHTML = dealerHas;
	document.getElementById('dealer-card-one').className = 'card';
	document.getElementById('dealer-card-one').innerHTML = deck[1];
	document.getElementById('draw-button').disabled = false;
	document.getElementById('stand-button').disabled = true;
	checkWin();
}












