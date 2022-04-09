const cardColor = ['green', 'red'];
const staves = ['circle', 'triangle', 'square'];
const faceValue = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class CardDeck = {
    constructor(color, suit, value){
        this.color = color;
        this.suit = suit;
        this.value = value;
    }
    sylop1 : 0, 
    sylop2 : 0
}

const testDeck = (color, suit, value) => {
    value.forEach(element => {
        
    });
}
console.log(testDeck(cardColor, staves, faceValue));
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