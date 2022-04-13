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
        this.deck.push(`gold sylop 0`, `gold sylop 0`);
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

const calcDealerHandValue = (dealHand) => {
    let pointsArr = [];
    const negSingleSearch = /-\d/g;
    const negDoubleSearch = /-\d\d/g;
    const posSingleSearch = /\d/g;
    const posDoubleSearch = /\d\d/g;

    // const found = () => {dHand.match(regex);}

    for (let i=0; i<dealHand.length; i++) {
        if (dealHand[i].match(negDoubleSearch)) {
            pointsArr.push(dealHand[i].match(negDoubleSearch));
        } else if (dealHand[i].match(negSingleSearch)) {
            pointsArr.push(dealHand[i].match(negSingleSearch));
        } else if (dealHand[i].match(posDoubleSearch)) {
            pointsArr.push(dealHand[i].match(posDoubleSearch));
        } else if (dealHand[i].match(posSingleSearch)) {
            pointsArr.push(dealHand[i].match(posSingleSearch));
        }
    }
    console.log(pointsArr);
    // let cardOneValue = [];
    // let cardOne = dealHand.split('').reverse();
    // for (let i =0; i<cardOne.length; i++) {
    //     if (cardOne[i] === 's') {
    //         return Number(cardOneValue.reverse().join(''));
    //     } else if (cardOne[i] === '-') {
    //         cardOneValue.push('-');
    //     } else {
    //         cardOneValue.push(cardOne[i]);
    //     }
    // }
    // return cardOneValue;
}

calcDealerHandValue(dHand);

const discardPile = [];
if (discardPile[0] != null){
    $("#discardPile").addClass(discardPile[discardPile.length]);
}

//dice roll attempt
const rollDice = () => {
    const diceSides = ['sideOne', 'sideTwo', 'sideThree', 'sideFour', 'sideFive', 'sideSix'];
    let randomA = Math.floor(Math.random() * diceSides.length);
    $("#dice1").addClass(diceSides[randomA]);
    let randomB = Math.floor(Math.random() * diceSides.length);
    $("#dice2").addClass(diceSides[randomB]);
}

rollDice();