class Deck {
    constructor() {
        this.deck = [];

        const cardColor = ['green', 'red'];
        const staves = ['circles', 'triangles', 'squares'];
        const posFaceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const negFaceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1];

        for (let suit in staves) {
            for (let value in posFaceValue) {
                this.deck.push(`green ${staves[suit]} ${posFaceValue[value]}`);
            }
        }
        for (let suit in staves) {
            for (let value in negFaceValue) {
                this.deck.push(`red ${staves[suit]} ${negFaceValue[value]}`);
            }
        }
        this.deck.push(`sylop 0`, `sylop 0`);
        
    }   
    shuffle() {
        const deck = this.deck;
        let cardTotal = deck.length;
        let random;

        while (cardTotal) {
            random = Math.floor(Math.random() * cardTotal--);
            [deck[cardTotal], deck[random]] = [deck[random], deck[cardTotal]];
        }
        return this;
    }

    deal() {
        return this.deck.pop();
    }

    reset(){
        this.deck = [];

        const cardColor = ['green', 'red'];
        const staves = ['circles', 'triangles', 'squares'];
        const posFaceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const negFaceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1];

        for (let suit in staves) {
            for (let value in posFaceValue) {
                this.deck.push(`green ${staves[suit]} ${posFaceValue[value]}`);
            }
        }
        for (let suit in staves) {
            for (let value in negFaceValue) {
                this.deck.push(`red ${staves[suit]} ${negFaceValue[value]}`);
            }
        }
        this.deck.push(`sylop 0`, `sylop 0`);
    }
}

const deck1 = new Deck();
console.log(deck1.deck);
deck1.shuffle();
console.log(deck1.deck);