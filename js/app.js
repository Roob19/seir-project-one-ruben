class Deck {
    constructor() {
        this.deck = [];

        const cardColor = ['green', 'red'];
        const staves = ['circles', 'triangles', 'squares'];
        const faceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        for (let suit in staves) {
            for (let value in faceValue) {
                for (let color in cardColor) {
                    this.deck.push(`${cardColor[color]} ${staves[suit]} ${faceValue[value]}`);
                }
            }
        this.deck.push(`sylop 0`, `sylop 0`);
        }
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
        const faceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        for (let suit in staves) {
            for (let value in faceValue) {
                for (let color in cardColor) {
                    this.deck.push(`${cardColor[color]} ${staves[suit]} ${faceValue[value]}`);
                }
            }
        this.deck.push(`sylop 0`, `sylop 0`);
        }
    }
}

const deck1 = new Deck();
console.log(deck1.deck);
deck1.shuffle();
console.log(deck1.deck);
// deck1.deal();
// console.log(deck1.deck);

// const testDeck = (colorArray, suitArray, valueArray) => {
//     value.forEach((element, index)  => {
//         const card = {
//             valueArray[index] : staves[index].concat(cardColor[index]),
//         }
//         return card;
//     });
// }
// console.log(testDeck(faceValue, staves, cardColor ));
//     grnCircleOne : 1, 
//     grnCircleTwo : 2, 
//     grnCircleThr : 3, 
//     grnCircleFou : 4, 
//     grnCircleFiv : 5, 
//     grnCircleSix : 6, 
//     grnCircleSev : 7, 
//     grnCircleEig : 8, 
//     grnCircleNin : 9, 
//     grnCircleTen : 10, 
//     redCircleOne : -1, 
//     redCircleTwo : -2, 
//     redCircleThr : -3, 
//     redCircleFou : -4, 
//     redCircleFiv : -5, 
//     redCircleSix : -6, 
//     redCircleSev : -7, 
//     redCircleEig : -8, 
//     redCircleNin : -9, 