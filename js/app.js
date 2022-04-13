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

const deck1 = new Deck();
deck1.shuffle();
const compPlayer = new Player();
const playerOne = new Player();
const dHand = [];
const pHand = [];

//turn mechanic
compPlayer.player.dealerToken = true;

if (compPlayer.player.dealerToken === true) {
    $('#dDealerToken').addClass('show');
} else {
    $('#dDealerToken').addClass('show');
}
//flip top card up and place on spikePile
initialSpikeCard =deck1.deck[deck1.deck.length-1];
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
//populate each players chip value
$("#dCredBalance").text(`$${compPlayer.player.credBalance}`);
$("#pCredBalance").text(`$${playerOne.player.credBalance}`);


//discard face showing up
const faceUpDiscard = [];
if (faceUpDiscard[0] != null){
    $("#discardPile").addClass(faceUpDiscard[faceUpDiscard.length]);
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

if (playerOne.player.dealerToken === false && playerOne.player.cardC === null) {
    const drawCard = () => {
        playerOne.player.cardC = deck1.deck[deck1.deck.length-1];
        $("#pCardC").addClass(playerOne.player.cardC);
        pHand.push(playerOne.player.cardC);
        deck1.deal();
        compPlayer.player.dealerToken = false;
        playerOne.player.dealerToken = true;
        $('#dDealerToken').removeClass('show');
        $('#pDealerToken').addClass('show');
        calcHandValue;
    }
    drawPile.addEventListener('click', drawCard);
} else if (playerOne.player.dealerToken === false && playerOne.player.cardD === null) {
    const drawCard = () => {
        playerOne.player.cardD = deck1.deck[deck1.deck.length-1];
        $("#pCardD").addClass(playerOne.player.cardD);
        pHand.push(playerOne.player.cardD);
        deck1.deal();
        compPlayer.player.dealerToken = false;
        playerOne.player.dealerToken = true;
        $('#dDealerToken').removeClass('show');
        $('#pDealerToken').addClass('show');
    }
    drawPile.addEventListener('click', drawCard);
} else if (playerOne.player.dealerToken === false && playerOne.player.cardE === null) {
    const drawCard = () => {
        playerOne.player.cardE = deck1.deck[deck1.deck.length-1];
        $("#pCardE").addClass(playerOne.player.cardE);
        pHand.push(playerOne.player.cardE);
        deck1.deal();
        compPlayer.player.dealerToken = false;
        playerOne.player.dealerToken = true;
        $('#dDealerToken').removeClass('show');
        $('#pDealerToken').addClass('show');
    }
    drawPile.addEventListener('click', drawCard);
}

dHand.push(compPlayer.player.cardA);
dHand.push(compPlayer.player.cardB);
dHand.push(compPlayer.player.cardC);
dHand.push(compPlayer.player.cardD);
dHand.push(compPlayer.player.cardE);

pHand.push(playerOne.player.cardA);
pHand.push(playerOne.player.cardB);


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
//calculates total value of cards in a hand and populates HTML
$('#dHandVal').text(calcHandValue(dHand));
$('#pHandVal').text(calcHandValue(pHand));

console.log(dHand);
console.log(pHand);
console.log(playerOne.player);