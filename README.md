<h1 align="center">seir-project-one-ruben</h1>
<h2 align="center">This project is for educational purposes only and is a work in progress. </h2>

___
## My first project:

<h3 align="center">Technologies used: </h3>

|   [HTML 5](https://whatwg.org/)    |   [CSS 3](https://www.w3.org/TR/CSS/#css)    |   [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)  |   [JQuery](https://jquery.com/)  |
|:----------:|:--------:|:-------------:|:---------:|
|   [GitHub](https://github.com/)  |   [BASH script](https://www.gnu.org/software/bash/) |   [Bootstrap](https://getbootstrap.com/docs/5.1/examples/)   |   [Whimsical](https://whimsical.com)   |
|   [Trello](https://trello.com)  |   [Netlify](https://netlify.com) |   [PNG images](https://en.wikipedia.org/wiki/Portable_Network_Graphics)  |   [MP3 audio](https://en.wikipedia.org/wiki/MP3)   |
|   [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)    |   [Stack Overflow](https://stackoverflow.com/)  |   [Slack](https://slack.com)   |   [ZOOM](https://zoom.us)    |

___
<p align="center"><img src="https://static.wikia.nocookie.net/starwars/images/c/c1/SoloAdaptation3-CoverArt.jpg/revision/latest/scale-to-width-down/500?cb=20190719033302" border="10"/></p>

___

# **Corellian Spike**

[Link to Game](https://gilded-capybara-a141c7.netlify.app/)


Corellian Spike is a variant on Sabacc, a card game played throughout the fictional Star Wars Galaxy. 

<samp>The same card game and variation where `Han Solo` won the `Milenium Falcon` from `Lando Calrissian` on Vandor-1. </samp>

___

<p align="center"><img src="https://media.giphy.com/media/ek2fpwckr4uis/giphy.gif" border="10"/></p>

___
Corellian Spike uses a 62-card deck and two six-sided dice. 
    "The deck comprises of: "
-    10 green, circle suited cards, with values of 1-10. 
-    10 green, triangle suited cards, with values of 1-10. 
-    10 green, square suited cards, with values of 1-10. 
-    10 red, circle suited cards, with values of -10 to -1. 
-    10 red, triangle suited cards, with values of -10 to -1. 
-    10 red, square suited cards, with values of -10 to -1. 
-    2 uncolored cards, with the value of 0, Sylop(s). 

-    The 2d6 are identical and comprise of six glyfs.


The objective of the game is to have a hand where the total value is as close to zero as possible. 

There are three rounds to a game. 
```
Setup: 
    Game starts with each player contributing two credits/chips to the game pot and one credit to the sabacc pot. 
        Sabacc pot can only be won if the winning hand is === 0. 

        The dealer must do the following:
        - Shuffle the deck, then deal two cards facedown to each
        player. Players can look at their cards but must keep them
        secret!
        - Place the remaining deck face down in the centre of play. This is the draw pile.
        - Take the top card from the draw pile and place it face up next to the deck face up.
        During the game, discarded cards will form the discard pile.
        A betting phase begins with the player on the dealer’s left.
```
## GAME PHASES 

    A Corellian Spike round is played in three turns. Each turn consists of three phases:
```     
Draw Phase
    The player on the dealer’s left always goes first.

    During your turn you can:
            1. Calculate your hand. Green cards are positive and red cards are negative. 
                Keep in mind that you must reach a value of zero.
            2. Choose one of these options:
                a. Take the top card from the Draw Pile. This will cost you 1 credit.
                    b. Discard one of your cards and trade it for the top card from the Draw Pile.
                    c. Take the face up card. This will cost you 2 credits.
                    d. Discard one of your cards and trade it for the face up card.
                    e. Do nothing. This is known as “standing”, which means that you do not want a new card.
            3. End your turn. Then the player on your left can play.
                        Note: There must always be at least one face up card. 
                        If you happen to take this card, 
                            the dealer must place the top card from the draw pile face up. 
```
```
Betting Phase
    Beginning with the player to the left of the dealer, players each can call, raise, stand or 
    fold when it’s their turn to bet.
        Call: To match the amount of the highest bet on the table.
        Raise: To increase the bet amount.
        Stand: To continue the game without betting any further. 
            This action can be taken by any player only if he has already matched the biggest bet on the table or 
            if no one has yet opened the betting round.
        Fold: To leave the ongoing game by surrendering your cards to the dealer and wait for the next round to start.
```
```
Spike Phase
    Once the betting phase is over, the dealer rolls the dice. If the symbols are different, nothing happens.
    If the symbols match, players must remember the number of cards they have in their hands before discarding them. 
    Then, the dealer gives each player the same number of cards they just had with new cards from the draw pile.
    These three phases (Draw, Betting and Spike) must be played again twice, making the two final turns.
```
## WINNING A ROUND

>To win a round at the end of the three turns, you must have the best hand, according to the hierarchy of the hands detailed in the WINNING HANDS section.

>If there is a tie, each tied player must take a card from the draw pile. The player with the closest card to zero wins the round. A positive number always beats an equal negative number. If the two cards have the same value, the two players must both take a new card and repeat this action until the two cards show two different values.
```
If you win the round with a hand with a total score close to zero, you win the Hand Pot.
If you win the round with a hand with a total score of zero, you win both the Main Pot and the Sabacc Pot.
```
## WINNING HANDS
```
Pure Sabacc: 
    Zero with the two Sylops. 
Full Sabacc: 
    Zero with two +10 and two -10 (four of a kind, 10s) and the Sylop. 
Fleet: 
    Zero with a four of a kind (except10s) and a Sylop. 
        The four of a kind closest to zero wins if there are several Fleet. 
Yee-Haa: 
    Zero with a pair and a Sylop. If there are several Yee-Haa, the pair that is closest to zero wins. 
Rhylet: 
    Zero with positive three of a kind and a negative pair or a negative three of a kind and a positive pair. 
        The three of a kind closest to zero wins if there are several Rhylet.
Squadron: 
    Zero with a four of a kind. The four of a kind closest to zero wins if there are several Squadron.
Gee Whiz: 
    Four cards in sequential order from 1 to 4 and a 10 of the opposite sign.
Straight Khyron (or Straight Staves/Suits): 
    Four cards in sequential order with a total score of zero. 
        The hand with the first card which is the closest to zero wins if there are several Straight Khyron.
Bantha’s Wild: 
    Zero with a three of a kind. The three of a kind closest to zero wins if there are several Bantha’s Wild.
Rule of Two: 
    Zero with two pairs. The pair closest to zero wins if there are several Rule of Two.
Sabacc (with a pair): 
    Hand equal to zero with a pair. The pair closest to zero wins if there are several Sabacc with pairs.
Sabacc with highest value single card: 
    Zero with the highest positive card. If the total of positive cards is the same, 
        the hand with the highest positive single card wins.
Sabacc with highest value cards: 
    Zero with the highest total of positive cards. The number of cards is the same, 
        the total of positive cards determines the best hand. 
            Here, the first hand (7-3=10) beats the second one (5+1=6).
Sabacc with most cards: 
    If there are several hands equal to zero, the hand with most cards wins.
Nulrhek with highest value single card: 
    If two players have the same total, and if the total of positive cards is the same, 
        the hand with the highest positive single card wins.
Nulrhek with highest value cards: 
    If two players have the same total and that their number of cards is the same, 
        the total of positive cards determines the best hand.
Nulrhek with most cards: 
    If two players have the same total, the hand with most cards wins.
Nulrhek with a positive score: 
    The closest to zero with a positive score will always win against a negative score of the same value.
Nulrhek: 
    The hand that is closest to zero wins.
Single Blind Draw: 
    If players are still tied after considering all the previous hands, all tied players draw a new card each. 
        The player whose card is the closest to zero wins. A positive number beats a negative one. 
        If there’s still a tie, the tied players must draw again until there is a winner.
```



## A **HUGE** thanks to the contributors and creators of the reference material used to make this project possible: 

>**Suresh Sigera** - https://generalassemb.ly/instructors/suresh-sigera/19888

>**Nathan Mausert** - https://coffeegremlin.com/

>**Hayk Mnatsakanyan** - https://github.com/Zoneam

>**John McCants** - https://github.com/johnmccants002

>**William Vincent** - https://wsvincent.com/javascript-object-oriented-deck-cards/ 

>**Mike Bostock** - https://bost.ocks.org/mike/shuffle/ 

>**Carlos Delgado** - https://ourcodeworld.com/articles/read/1470/how-to-find-the-closest-value-to-zero-from-an-array-with-positive-and-negative-numbers-in-javascript

>**Table Top Audio** - https://tabletopaudio.com/

>**Nulpoints** - https://github.com/Nulpoints 

>**La Tribune de Coruscant** - https://www.youtube.com/watch?v=aym6aGyH4mQ 

>**Wookieepedia** - https://starwars.fandom.com/wiki/Corellian_Spike 

>**General Assembly** - https://generalassemb.ly/

>**The city of Rancho Cordova** - https://www.cityofranchocordova.org/