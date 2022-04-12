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
        this.deck.push(`gold sylop 0`, `gold sylop 0`);//only two sylops of 0 value and of no suit per deck, 62 cards in total
        
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

const initialize = () => {
    const deck1 = new Deck();
    deck1.shuffle();
    const compPlayer = new Player();
    const playerOne = new Player();

    $("#pCardA").add.classList(deck1[deck1.length]);
    deal(deck1);
    $("#dCardA").add.classList(deck1[deck1.lenth]);
    deal(deck1);
}

const discardPile = [];
if (discardPile[0] != null){
    $("#discardPile").add.classList(discardPile[discardPile.length]);
}


const deck2 = new Deck();
console.log(deck2.deck);
deck2.shuffle();

//removing spaces from cards in Deck to use as classes in CSS to diplay card images
let cardStringConverter = deck2.deck.map(element => element.replace(/ /g, ''));
console.log(cardStringConverter);

//dice roll attempt
const rollDice = () => {
    const diceSides = ['sideOne', 'sideTwo', 'sideThree', 'sideFour', 'sideFive', 'sideSix'];
    let randomA = Math.floor(Math.random() * diceSides.length);
    $("#dice1").classList.add(diceSides[randomA]);
    let randomB = Math.floor(Math.random() * diceSides.length);
    $("#dice2").classList.add(diceSides[randomB]);
}
rollDice();