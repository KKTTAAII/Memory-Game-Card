const gameContainer = document.getElementById('game');
const restartBtn = document.querySelector('button')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);


  }
}
let flipped = 0;
let matchedCards = [];
let cardOne = '';
let cardTwo = '';

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  if (cardOne && cardTwo) return;
  //the above will stop the user from cliking more than 2 cards
  let selectedCard = event.target
  let color = selectedCard.getAttribute('class')
  selectedCard.style.backgroundColor = color;
  flipped++ //count when the card is clicked
  
  if(cardOne === selectedCard){
    return cardOne;
  }

  if(cardOne){
    cardTwo = selectedCard//this gives you a string
    }else{
    cardOne = selectedCard//this gives you a string
    }

  if(cardOne && cardTwo){
    checkMatched(cardOne.getAttribute('class'), cardTwo.getAttribute('class'));
  }

  // console.log(`This is ${cardOne.getAttribute('class')} and this is ${cardTwo.getAttribute('class')}`)
}


function checkMatched(color1, color2){
  if(color1 === color2){
    matched();
    //so the user cannot select the third card - we reset the click number
    flipped = 0;
  }else{
    notMatched();
    //so the user cannot select the third card - we reset the click number
    flipped = 0;
  }
}

function notMatched(){
    // console.log('NOT MATCHED!');
    //we set timer so the cards do not show too long and the user will remember
    setTimeout(() => {
      //if not matched, we make the card's color to nothing
      cardOne.style.backgroundColor = null;
      cardTwo.style.backgroundColor = null;
      //we clear the 2 cards we select so we can compare a new pair
      cardOne = null;
      cardTwo = null;
       }, 500); 
}

function matched(){
  //removed the event so user cannot click again
    cardOne.removeEventListener('click', handleCardClick);
    cardTwo.removeEventListener('click', handleCardClick);
    // console.log('MATCHED!');
    //add this to the array so when all match, we know
    matchedCards.push(cardOne, cardTwo); 
    // console.log(matchedCards);
    //reset the value the card after it's matched so we can compare a new pair
    cardOne = null;
    cardTwo = null;
    //we alert the user when they match all 10 cards
    if(matchedCards.length === 10){
      return;
  }
}

restartBtn.addEventListener('click', function(e){
  window.location.reload(false);
})
// when the DOM loads
createDivsForColors(shuffledColors);

