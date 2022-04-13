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
//player cards
const pCardA = document.querySelector('#pCardA');
const pCardB = document.querySelector('#pCardB');
const pCardC = document.querySelector('#pCardC');
const pCardD = document.querySelector('#pCardD');
const pCardE = document.querySelector('#pCardE');
//piles
const drawPile = document.querySelector('#drawPile');
const spikePile = document.querySelector('#spikePile');


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

let playerTurn = 0;

const deck1 = new Deck();
deck1.shuffle();
const compPlayer = new Player();
const playerOne = new Player();
const dHand = [];
const pHand = [];

//deal two cards to each player from top of deck
compPlayer.player.cardA = deck1.deck[deck1.deck.length-1];
$("#pCardA").addClass(compPlayer.player.cardA);
deck1.deal();
playerOne.player.cardA = deck1.deck[deck1.deck.length-1];
$("#dCardA").addClass(playerOne.player.cardA);
deck1.deal();
compPlayer.player.cardB = deck1.deck[deck1.deck.length-1];
$("#pCardB").addClass(compPlayer.player.cardB);
deck1.deal();
playerOne.player.cardB = deck1.deck[deck1.deck.length-1];
$("#dCardB").addClass(playerOne.player.cardB);
deck1.deal();
//populate each players chip value
$("#dCredBalance").text(`$${compPlayer.player.credBalance}`);
$("#pCredBalance").text(`$${playerOne.player.credBalance}`);

dHand.push(compPlayer.player.cardA);
dHand.push(compPlayer.player.cardB);
dHand.push(compPlayer.player.cardC);
dHand.push(compPlayer.player.cardD);
console.log(dHand);

pHand.push(playerOne.player.cardA);
pHand.push(playerOne.player.cardB);
pHand.push(playerOne.player.cardC);
pHand.push(playerOne.player.cardD);
console.log(pHand);

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
//dicard face showing up
const discardPile = [];
if (discardPile[0] != null){
    $("#discardPile").addClass(discardPile[discardPile.length]);
}


function rollDice() {
    const diceSides = ['sideOne', 'sideTwo', 'sideThree', 'sideFour', 'sideFive', 'sideSix'];
    let randomA = Math.floor(Math.random() * diceSides.length);
    $("#dice1").addClass(diceSides[randomA]);
        console.log(randomA);
    let randomB = Math.floor(Math.random() * diceSides.length);
    $("#dice2").addClass(diceSides[randomB]);
        console.log(randomB);
}

diceBox.addEventListener('click', rollDice);

// const diceOne = document.querySelector('#dice1');
// diceOne.addEventListener('click', rollDice);

// const diceTwo = document.querySelector('#dice2');
// diceTwo.addEventListener('click', rollDice);