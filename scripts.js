var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;
var totalPot = 1000;
var bet = 0;
var busted = false;

function bust(who){
	if(who === 'player'){
		document.getElementById('message').innerHTML = "You have busted, better luck next time";
		document.getElementById('dealer-card-one').className = 'card';
		document.getElementById('dealer-card-one').innerHTML = deck[1];
		totalPot-=bet;
	}else if(who === 'dealer'){
		document.getElementById('message').innerHTML = "The dealer has busted, you win!";
		totalPot+=bet;
	}
	document.getElementById('win-count').innerHTML = "$"+totalPot;
	busted = true;
	if(totalPot <= 0){
		alert("You're out of money!")
		document.getElementById('draw-button').disabled = true;
		document.getElementById('hit-button').disabled = true;
		document.getElementById('stand-button').disabled = true;
	}else if((busted)&&(totalPot>0)){
		document.getElementById('draw-button').disabled = false;
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
	if((total===22)&&(hand.length<3)){
		total = 12;
	}

	var idWhoToGet = who+'-total';
	document.getElementById(idWhoToGet).innerHTML = total;
	
		if((total>21)&&(!busted)){
				bust(who);	
		}
	return total;
}

function checkWin(){
	if(!busted){	
		var playerTotal = calculateTotal(playerHand,'player');
		var dealerTotal = calculateTotal(dealerHand,'dealer');
	

	
		var winner;
		
		if((playerTotal===21)&&(dealerTotal!==21)){
			winner='blackjack'
		}
		else if(((playerTotal>dealerTotal)&&(playerTotal<=21))||((dealerTotal>21)&&(playerTotal<=21))){
			// Player Wins!
			winner = 'player';
		}else if(((playerTotal === dealerTotal)&&(playerTotal<=21))||((playerTotal>21)&&(dealerTotal>21))){
			winner = 'tie';
			// Push
		}else{
			winner = 'dealer';
		}
		if(winner=== 'blackjack'){
			document.getElementById('message').innerHTML = "BlackJack!"
			totalPot+=bet*1.5;
		}
		else if(winner === 'player'){
			document.getElementById('message').innerHTML = "You Win!";
			totalPot+=bet;
		}else if(winner === 'dealer'){
			document.getElementById('message').innerHTML = "You Lose!";
			totalPot-=bet;
		}else if(winner === 'tie'){
			document.getElementById('message').innerHTML = "Push!";
		}
	}
	if(totalPot <= 0){
		alert("You're out of money!")
		document.getElementById('draw-button').disabled = true;
		document.getElementById('hit-button').disabled = true;
		document.getElementById('stand-button').disabled = true;
	}
	document.getElementById('win-count').innerHTML = "$"+totalPot;

}

function placeBet(amount){
	bet += amount;
	if(bet<0){
		document.getElementById('message').innerHTML = "You must wager a positive amount";
		bet = 0;
	}else if(bet> totalPot){
		document.getElementById('message').innerHTML = "You have wagered the maximum";
		bet = totalPot;
	}
	
	document.getElementById('current-bet').innerHTML = "$"+ bet;
}

function deal(){
// Shuffled deck from function shuffleDeck
	reset();
	var currPot = totalPot-bet;
	document.getElementById('win-count').innerHTML = "$"+currPot;

	if(bet == 0){
		document.getElementById('message').innerHTML = "You must make a wager"
		return false;
	}

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
	busted = false;
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
	if(busted){
		document.getElementById('draw-button').disabled = false;
		document.getElementById('hit-button').disabled = true;
	}
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
			suit = "<img style='width: 30px; height: 30px;' src='hearts.png'>";
		}else if(s === 2){
			suit = "<img style ='width:30px; height: 30px;' src='spades.jpg'>";
		}else if(s === 3){
			suit = "<img style ='width:30px; height: 30px;' src='diamond.png'>";
		}else if(s === 4){
			suit = "<img style ='width:30px; height: 30px;' src='clubs.png'>";
		}
		//card number
		for(i = 1; i <= 13; i++){
			deck.push(i+suit);
		}
	}

	// var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	var numberOfTimesToShuffle = 2000;

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
	document.getElementById('stand-button').disabled = true;
	document.getElementById('draw-button').disabled = false;
	checkWin();

}












