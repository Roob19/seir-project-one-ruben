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
//bet buttons
const pBetUp =document.querySelector('#pBetUp');
const pBetDown = document.querySelector('#pBetDown');
const dBetUp = document.querySelector('#dBetUp');
const dBetDown = document.querySelector('#dBetDown');
//stand buttons
const dStands = document.querySelector('#dStands');
const pStands = document.querySelector('#pStands');
const endGameButton = document.querySelector('#hadEnough');

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
    //removes one card from top of created deck
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
//player class an constructor for making more players //my folly
class Player {
    constructor(){
        this.player = {
            cardA : null, 
            cardB : null, 
            cardC : null, 
            cardD : null,
            cardE : null, 
            credBalance : 0, 
            dealerToken : false
        }
    }
}

//start of game
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

//flip top card up and place on spikePile at start/load
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
//adding the two cards freshly drawn to compPlayer
dHand.push(compPlayer.player.cardA);
dHand.push(compPlayer.player.cardB);
//adding the two cards freshly drawn to playerOne
pHand.push(playerOne.player.cardA);
pHand.push(playerOne.player.cardB);

//populate each players chip value at start
let playerStartingBalance = 54;
let compStartingBalance = 54;
function startingBalance() {
    $("#dCredBalance").text(`$${compStartingBalance}`);
    $("#pCredBalance").text(`$${playerStartingBalance}`);
}
setTimeout(() => {startingBalance()}, 300);

//calculate the total face value of all cards in hand
const calcHandValue = (cardsInHand) => {
    let pointsArr = [];
    let nullCount = 0;
    const negSingleSearch = /-\d/g; //regex flex 🦾
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
//diplaying calculated values
$('#pHandVal').text(calcHandValue(pHand));
$('#dHandVal').text(calcHandValue(dHand));

//player one to draw from deck when it's their turn
function playerDrawCardA() {
    playerOne.player.cardA = deck1.deck[deck1.deck.length-1];
    $("#pCardA").addClass(playerOne.player.cardA);
    pHand.push(playerOne.player.cardA);
    deck1.deal();
    compPlayer.player.dealerToken = false;
    playerOne.player.dealerToken = true;
    whosTurn();
    $('#pHandVal').text(calcHandValue(pHand));
    dealerTurn()
}
function playerDrawCardB() {
    playerOne.player.cardB = deck1.deck[deck1.deck.length-1];
    $("#pCardB").addClass(playerOne.player.cardB);
    pHand.push(playerOne.player.cardB);
    deck1.deal();
    compPlayer.player.dealerToken = false;
    playerOne.player.dealerToken = true;
    whosTurn();
    $('#pHandVal').text(calcHandValue(pHand));
    dealerTurn()
}
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
}
//allows player to draw more cards from deck/draw pile
function playerTurn() {
    if (!$(pDealerToken).hasClass('show') && playerOne.player.cardC === null) {
        drawPile.addEventListener('click', playerDrawCardC);
    } else if (!$(pDealerToken).hasClass('show') && playerOne.player.cardD === null) {
        drawPile.addEventListener('click', playerDrawCardD);
    } else if (!$(pDealerToken).hasClass('show') && playerOne.player.cardE === null) {
        drawPile.addEventListener('click', playerDrawCardE);
    }
    setTimeout(() => {dealerTurn()}), 300;
}

//other player to draw from deck when it's their turn
function compDrawCardA() {
    compPlayer.player.cardA = deck1.deck[deck1.deck.length-1];
    $("#dCardA").addClass(compPlayer.player.cardA);
    dHand.push(compPlayer.player.cardA);
    deck1.deal();
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    playerTurn();
}
function compDrawCardB() {
    compPlayer.player.cardB = deck1.deck[deck1.deck.length-1];
    $("#dCardB").addClass(compPlayer.player.cardB);
    dHand.push(compPlayer.player.cardB);
    deck1.deal();
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    playerTurn();
}
function compDrawCardC() {
    compPlayer.player.cardC = deck1.deck[deck1.deck.length-1];
    $("#dCardC").addClass(compPlayer.player.cardC);
    dHand.push(compPlayer.player.cardC);
    deck1.deal();
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    playerTurn();
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
}
function compDrawCardE() {
    compPlayer.player.cardE = deck1.deck[deck1.deck.length-1];
    $("#dCardE").addClass(compPlayer.player.cardE);
    dHand.push(compPlayer.player.cardE);
    deck1.deal();
    whosTurn();
    $('#dHandVal').text(calcHandValue(dHand));
    playerTurn();
}
//allows dealer to draw more cards from deck/draw pile
function dealerTurn() {
    if (!$(dDealerToken).hasClass('show') && compPlayer.player.cardC === null) {
        drawPile.addEventListener('click', compDrawCardC);
    } else if (!$(dDealerToken).hasClass('show') && compPlayer.player.cardD === null) {
        drawPile.addEventListener('click', compDrawCardD);
    } else if (!$(dDealerToken).hasClass('show') && compPlayer.player.cardE === null) {
        drawPile.addEventListener('click', compDrawCardE);
    } else {
        setTimeout(() => {playerTurn()}), 300;
    }
}

//discard pile top card showing face up
const faceUpDiscard = [];
function discardFunction() {
    $("#discardPile").addClass(faceUpDiscard[faceUpDiscard.length-1]);
}

//discard card from pHand
function playerDiscardCardA() {
    faceUpDiscard.push(playerOne.player.cardA);
    playerOne.player.cardA = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {playerDrawCardA()}, 500);
    setTimeout(() => {dealerTurn()}, 700);
}
pCardA.addEventListener('click', playerDiscardCardA);

function playerDiscardCardB() {
    faceUpDiscard.push(playerOne.player.cardB);
    playerOne.player.cardB = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {playerDrawCardB()}, 500);
    setTimeout(() => {dealerTurn()}, 700);
}
pCardB.addEventListener('click', playerDiscardCardB);

function playerDiscardCardC() {
    faceUpDiscard.push(playerOne.player.cardC);
    playerOne.player.cardC = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {playerDrawCardC()}, 500);
    setTimeout(() => {dealerTurn()}, 700);
}
pCardC.addEventListener('click', playerDiscardCardC);

function playerDiscardCardD() {
    faceUpDiscard.push(playerOne.player.cardD);
    playerOne.player.cardC = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {playerDrawCardD()}, 500);
    setTimeout(() => {dealerTurn()}, 700);
}
pCardD.addEventListener('click', playerDiscardCardD);

function playerDiscardCardE() {
    faceUpDiscard.push(playerOne.player.cardE);
    playerOne.player.cardE = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {playerDrawCardE()}, 500);
    setTimeout(() => {dealerTurn()}, 700);
}
pCardE.addEventListener('click', playerDiscardCardE);

//discard card from dHand
function dealerDiscardCardA() {
    faceUpDiscard.push(compPlayer.player.cardA);
    compPlayer.player.cardA = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {compDrawCardA()}, 500);
    setTimeout(() => {playerTurn()}, 700);
}
dCardA.addEventListener('click', dealerDiscardCardA);

function dealerDiscardCardB() {
    faceUpDiscard.push(compPlayer.player.cardB);
    compPlayer.player.cardB = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {compDrawCardB()}, 500);
    setTimeout(() => {playerTurn()}, 700);
}
dCardB.addEventListener('click', dealerDiscardCardB);

function dealerDiscardCardC() {
    faceUpDiscard.push(compPlayer.player.cardC);
    compPlayer.player.cardC = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {compDrawCardC()}, 500);
    setTimeout(() => {playerTurn()}, 700);
}
dCardC.addEventListener('click', dealerDiscardCardC);

function dealerDiscardCardD() {
    faceUpDiscard.push(compPlayer.player.cardD);
    compPlayer.player.cardC = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {compDrawCardD()}, 500);
    setTimeout(() => {playerTurn()}, 700);
}
dCardD.addEventListener('click', dealerDiscardCardD);

function dealerDiscardCardE() {
    faceUpDiscard.push(compPlayer.player.cardE);
    compPlayer.player.cardE = null;
    setTimeout(() => {discardFunction()}, 300);
    setTimeout(() => {compDrawCardE()}, 500);
    setTimeout(() => {playerTurn()}, 700);
}
dCardE.addEventListener('click', dealerDiscardCardE);

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
rollDice();
diceBox.addEventListener('click', rollDice);

//pot values being displayed
sabaccPotValue = 0;
$('#sabaccPot').text(sabaccPotValue);
gamePotValue = 0;
$('#gamePot').text(gamePotValue);

let tempPlayerBalance = playerOne.player.credBalance;
let tempCompBalance = compPlayer.player.credBalance;

function playerMinBet() {
    playerStartingBalance -= 2;
}
function compMinBet() {
    compStartingBalance -= 2;
}

//buttons for betting
function playerBetUp() {
    playerMinBet();
    $('#sabaccPot').text(sabaccPotValue += 1);
    $('#gamePot').text(gamePotValue += 1);
    setTimeout(() => {$('#dCreditBalance').text(playerStartingBalance)}, 500);
}
pBetUp.addEventListener('click', playerBetUp);

function dealerBetUp() {
    compMinBet();
    $('#sabaccPot').text(sabaccPotValue += 1);
    $('#gamePot').text(gamePotValue += 1);
    setTimeout(() => {$('#dCreditBalance').text(tempCompBalance)}, 500);
}
dBetUp.addEventListener('click', dealerBetUp)

//end game calc and win message
function winMessage(winner) {
    $('#winMsg').remove('hidden');
    $('winMsg').addClass('stayOn');
    if (winner === 'top') {
    $('#winMsg').text('TOP PLAYER WINS');
    } else if ( winner === 'bottom') {
    $('#winMsg').text('BOTTOM PLAYER WINS');
    } else if (winner === 'DRAW') {
    $('#winMsg').text(`${winner}! roll dice to determine winner.`);
    } else {
    $('#winMsg').text(`${winner} is the winning hand!`);
    }
}
//determining winner
function endGame() {
    const dealerEndPoints = Number($('#dHandVal').text());
        console.log(Number($('#dHandVal').text()));
    const playerEndPoints = Number($('#pHandVal').text());
        console.log(Number($('#pHandVal').text()));

    const twoHands =[dealerEndPoints, playerEndPoints];//used in meteorology
    let closestToZero = 0;
    for (let i=0; i<twoHands.length; i++) {
        if (closestToZero === 0){
            closestToZero = twoHands[i];
        } else if (twoHands[i] > 0 && twoHands[i] <= Math.abs(closestToZero)) {
            closestToZero = twoHands[i];
        } else if (twoHands[i] < 0 && - twoHands[i] < Math.abs(closestToZero)) {
            closestToZero = twoHands[i];
        }
    }
    if (dealerEndPoints === playerEndPoints) {
        winMessage('DRAW');
    } else if (dealerEndPoints === 0 && playerEndPoints === 0) {
        winMessage('DRAW');
    } else if (dealerEndPoints === closestToZero && playerEndPoints != closestToZero) {
        winMessage('top');
    } else if (playerEndPoints === closestToZero && dealerEndPoints != closestToZero) {
        winMessage('bottom');
    } else {
        winMessage(closestToZero)
    }
    console.log("closest to zero "+closestToZero);
}

//buttons to "stand" and switch turns
function topPlayerStands() {
    playerOne.player.dealerToken = false;
    compPlayer.player.dealerToken = true;
    whosTurn();
    playerTurn();
}
dStands.addEventListener('click', topPlayerStands);

function bottomPlayerStands() {
    compPlayer.player.dealerToken = false;
    playerOne.player.dealerToken = true;
    whosTurn();
    dealerTurn();
}
pStands.addEventListener('click', bottomPlayerStands);

//hidden quick end button
endGameButton.addEventListener('click',endGame);