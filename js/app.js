//dice
const diceBox = document.querySelector('#diceBox');
const dice1 = document.querySelector('#dice1');
const dice2 = document.querySelector('#dice2');
//dealer cards
const dCardA = document.querySelector('#dCardA');
const dCardB = document.querySelector('#dCardB');
const dCardC = document.querySelector('#dCardC');
const dCardD = document.querySelector('#dCardD');
const dCardE = document.querySelector('#dCardE');
//token
const dDealerToken = document.querySelector('#dDealerToken');
const pDealerToken = document.querySelector('#pDealerToken');
//player cards
const pCardA = document.querySelector('#pCardA');
const pCardB = document.querySelector('#pCardB');
const pCardC = document.querySelector('#pCardC');
const pCardD = document.querySelector('#pCardD');
const pCardE = document.querySelector('#pCardE');
//piles
const drawPile = document.querySelector('#drawPile');
const spikePile = document.querySelector('#spikePile');
const discardPile = document.querySelector('#discardPile');
//money pots
const sabaccPot = document.querySelector('#sabaccPot');
const gamePot = document.querySelector('#gamePot');

//deck class constructor and methods
class Deck {
    constructor() {
        this.deck = [];

        const staves = ['circles', 'triangles', 'squares'];//three suits of green and red, 60 cards
        const greenFaceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];//all green cards are of positive values, 30 green cards
        const redFaceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1];//all red cards are of positive values, 30 red cards

        for (let suit in staves) {
            for (let value in greenFaceValue) {
                this.deck.push(`green ${staves[suit]} ${greenFaceValue[value]}`);//all three suits given positive values and 'green' added to name
            }
        }
        for (let suit in staves) {
            for (let value in redFaceValue) {
                this.deck.push(`red ${staves[suit]} ${redFaceValue[value]}`);//all three suits given negative values and 'red' added to name
            }
        }
        this.deck.push(`gold sylops 0`, `gold sylops 0`);//only two sylops of 0 value and of no suit per deck, 62 cards in total
        this.deck = this.deck.map(element => element.replace(/ /g, ''));//removing spaces from cards in Deck to use as classes in CSS to diplay card images
    }
    //shuffles created deck
    shuffle() {
        const deck = this.deck;
        let cardTotal = deck.length;
        let random;

        while (cardTotal) {
            random = Math.floor(Math.random() * cardTotal--);
            [deck[cardTotal], deck[random]] = [deck[random], deck[cardTotal]];//Fisher-Yates Shuffle https://bost.ocks.org/mike/shuffle/
        }
        return this;
    }
    //removes one card from created deck
    deal() {
        return this.deck.pop();
    }
    //unshuffles created deck (copy of constructor)
    reset(){
        this.deck = [];

        const staves = ['circles', 'triangles', 'squares'];
        const greenFaceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const redFaceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1];
        
        for (let suit in staves) {
            for (let value in greenFaceValue) {
                this.deck.push(`green ${staves[suit]} ${greenFaceValue[value]}`);//assign positive values to green
            }
        }
        for (let suit in staves) {
            for (let value in redFaceValue) {
                this.deck.push(`red ${staves[suit]} ${redFaceValue[value]}`);//asign negative numbers to red
            }
        }
        this.deck.push(`gold sylops 0`, `gold sylops 0`);
    }
}

class Player {
    constructor(){
        this.player = {
            cardA : null, 
            cardB : null, 
            cardC : null, 
            cardD : null,
            cardE : null, 
            credBalance : 54, 
            dealerToken : false
        }
    }
}
//start game
const deck1 = new Deck();
deck1.shuffle();
const compPlayer = new Player();
const playerOne = new Player();
const dHand = [];
const pHand = [];

//turn mechanic
compPlayer.player.dealerToken = true;
function whosTurn() {
    if (compPlayer.player.dealerToken === true) {
    $('#dDealerToken').addClass('show');
    $('#pDealerToken').removeClass('show');
    playerTurn();
    } else {
    $('#pDealerToken').addClass('show');
    $('#dDealerToken').removeClass('show');
    }
}
whosTurn();



//flip top card up and place on spikePile
initialSpikeCard = deck1.deck[deck1.deck.length-1];
$('#spikePile').addClass(initialSpikeCard);
deck1.deal();

//deal two cards to each player from top of deck
compPlayer.player.cardA = deck1.deck[deck1.deck.length-1];
$("#dCardA").addClass(compPlayer.player.cardA);
deck1.deal();
playerOne.player.cardA = deck1.deck[deck1.deck.length-1];
$("#pCardA").addClass(playerOne.player.cardA);
deck1.deal();
compPlayer.player.cardB = deck1.deck[deck1.deck.length-1];
$("#dCardB").addClass(compPlayer.player.cardB);
deck1.deal();
playerOne.player.cardB = deck1.deck[deck1.deck.length-1];
$("#pCardB").addClass(playerOne.player.cardB);
deck1.deal();

dHand.push(compPlayer.player.cardA);
dHand.push(compPlayer.player.cardB);

pHand.push(playerOne.player.cardA);
pHand.push(playerOne.player.cardB);

//populate each players chip value
$("#dCredBalance").text(`$${compPlayer.player.credBalance}`);
$("#pCredBalance").text(`$${playerOne.player.credBalance}`);


//discard face showing up
const faceUpDiscard = [];
if (faceUpDiscard[0] != null){
    $("#discardPile").addClass(faceUpDiscard[faceUpDiscard.length]);
}

const calcHandValue = (cardsInHand) => {
    let pointsArr = [];
    let nullCount = 0;
    const negSingleSearch = /-\d/g;
    const negDoubleSearch = /-\d\d/g;
    const posSingleSearch = /\d/g;
    const posDoubleSearch = /\d\d/g;

    for (let i=0; i<cardsInHand.length; i++) {
        if (cardsInHand[i] === null) {
            nullCount += 1;
        } else if (cardsInHand[i].match(negDoubleSearch)) {
            pointsArr.push(cardsInHand[i].match(negDoubleSearch));
        } else if (cardsInHand[i].match(negSingleSearch)) {
            pointsArr.push(cardsInHand[i].match(negSingleSearch));
        } else if (cardsInHand[i].match(posDoubleSearch)) {
            pointsArr.push(cardsInHand[i].match(posDoubleSearch));
        } else if (cardsInHand[i].match(posSingleSearch)) {
            pointsArr.push(cardsInHand[i].match(posSingleSearch));
        }
    }
    const initialValue = 0;
    const sumOfCardsInHand = pointsArr.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue), initialValue);
    
    return sumOfCardsInHand;
}
$('#pHandVal').text(calcHandValue(pHand));
$('#dHandVal').text(calcHandValue(dHand));

//player one to draw from deck when it's their turn
function playerDrawCardC() {
    playerOne.player.cardC = deck1.deck[deck1.deck.length-1];
    $("#pCardC").addClass(playerOne.player.cardC);
    pHand.push(playerOne.player.cardC);
    deck1.deal();
    compPlayer.player.dealerToken = false;
    playerOne.player.dealerToken = true;
    whosTurn();
    $('#pHandVal').text(calcHandValue(pHand));
    dealerTurn()
    console.log('player cardC whos turn');
    console.log(compPlayer.player);
console.log(playerOne.player);
    //     console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
    //     console.log(`player classes: ${$('#pDealerToken').attr('class')}`);
}
function playerDrawCardD() {
    playerOne.player.cardD = deck1.deck[deck1.deck.length-1];
    $("#pCardD").addClass(playerOne.player.cardD);
    pHand.push(playerOne.player.cardD);
    deck1.deal();
    compPlayer.player.dealerToken = false;
    playerOne.player.dealerToken = true;
    whosTurn();
    $('#pHandVal').text(calcHandValue(pHand));
    dealerTurn()
        // console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
        // console.log(`player classes: ${$('#pDealerToken').attr('class')}`);
}
function playerDrawCardE() {
    playerOne.player.cardE = deck1.deck[deck1.deck.length-1];
    $("#pCardE").addClass(playerOne.player.cardE);
    pHand.push(playerOne.player.cardE);
    deck1.deal();
    compPlayer.player.dealerToken = false;
    playerOne.player.dealerToken = true;
    whosTurn();
    $('#pHandVal').text(calcHandValue(pHand));
    dealerTurn()
        // console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
        // console.log(`player classes: ${$('#pDealerToken').attr('class')}`);
}
function playerTurn() {
    if (!$(pDealerToken).hasClass('show') && playerOne.player.cardC === null) {
        drawPile.addEventListener('click', playerDrawCardC);
            console.log('inside cardC playerOne if statement');
            console.log('playerOne.player.cardC');
            console.log('playerOne.player.cardC');
    } else if (!$(pDealerToken).hasClass('show') && playerOne.player.cardD === null) {
        drawPile.addEventListener('click', playerDrawCardD);
            console.log('inside cardD playerOne if statement');
            console.log('playerOne.player.cardD');
    } else if (!$(pDealerToken).hasClass('show') && playerOne.player.cardE === null) {
        drawPile.addEventListener('click', playerDrawCardE);
            console.log('inside cardE playerOne if statement');
            console.log('playerOne.player.cardE');
    }
    dealerTurn();
}

//other player to draw from deck when it's their turn
function compDrawCardC() {
    compPlayer.player.cardC = deck1.deck[deck1.deck.length-1];
    $("#dCardC").addClass(compPlayer.player.cardC);
    dHand.push(compPlayer.player.cardC);
    deck1.deal();
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    console.log('cardC whos turn comp');
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    playerTurn();
        // console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
        // console.log(`player classes: ${$('#pDealerToken').attr('class')}`);
}
function compDrawCardD() {
    compPlayer.player.cardD = deck1.deck[deck1.deck.length-1];
    $("#dCardD").addClass(compPlayer.player.cardD);
    dHand.push(compPlayer.player.cardD);
    deck1.deal();
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    playerTurn();
        // console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
        // console.log(`player classes: ${$('#pDealerToken').attr('class')}`);
}
function compDrawCardE() {
    compPlayer.player.cardE = deck1.deck[deck1.deck.length-1];
    $("#dCardE").addClass(compPlayer.player.cardE);
    dHand.push(compPlayer.player.cardE);
    deck1.deal();
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    playerTurn();
        // console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
        // console.log(`player classes: ${$('#pDealerToken').attr('class')}`);
}
function dealerTurn() {
    if (!$(dDealerToken).hasClass('show') && compPlayer.player.cardC === null) {
        drawPile.addEventListener('click', compDrawCardC);
            console.log('inside cardC compPlayer');
            console.log(compPlayer.player.cardC);
            console.log(compPlayer.player);
            console.log(playerOne.player);
    } else if (!$(dDealerToken).hasClass('show') && compPlayer.player.cardD === null) {
        drawPile.addEventListener('click', compDrawCardD);
            console.log('inside cardD compPlayer');
            console.log(compPlayer.player.cardD);
    } else if (!$(dDealerToken).hasClass('show') && compPlayer.player.cardE === null) {
        drawPile.addEventListener('click', compDrawCardE);
            console.log('inside cardE compPlayer');
            console.log(compPlayer.player.cardE);
    }
}

//dice rolling mechanic
const diceSides = ['sideOne', 'sideTwo', 'sideThree', 'sideFour', 'sideFive', 'sideSix'];
function rollDice() {
    let randomA = Math.floor(Math.random() * diceSides.length);
    $("#dice1").addClass(diceSides[randomA]);
        console.log(`Dice one roll: ${randomA}`);
    let randomB = Math.floor(Math.random() * diceSides.length);
    $("#dice2").addClass(diceSides[randomB]);
        console.log(`Dice two roll: ${randomB}`);
}
diceBox.addEventListener('click', rollDice);


console.log(dHand);
console.log(pHand);
// console.log(compPlayer.player);
// console.log(playerOne.player);
console.log(`dealer classes: ${$('#dDealerToken').attr('class')}`);
console.log(`player classes: ${$('#pDealerToken').attr('class')}`);