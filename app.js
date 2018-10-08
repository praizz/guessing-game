
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const message = document.querySelector('.message');
let min = 1,
    max = 10,
    win = randNum(min, max),
    guessLeft = 3;
const guess = parseInt(guessInput.value);
minNum.textContent = min; //this makes it dynamic to replace those values
maxNum.textContent = max;  

//play-again event listener
//this event is added on the parent class cos the new classis added after the page is loaded
game.addEventListener('mousedown', function(e){ //mousedown cos if we use a click, it just keeps reloading the page
    if(e.target.className === 'play-again'){ //this ensures thhe vaue of the btn is pay again and not submit
        window.location.reload (); //this reloads the page automatically
    }
})

//load event listener
guessBtn.addEventListener('click', function(){
    const guess = parseInt(guessInput.value); //makes it an integer and not a string
    //validates the number to be inputed
    if(isNaN(guess) || guess < min || guess > max){ //is not a number or is not btwn the range, || means or
        guessInput.value = ''; //this clears the input
        setMessage(`Shine ya eye, enter a number between ${min} and ${max}`, 'red');   
    }else{//if the number is within the criteria

    //if the guess was the winning number
        if(guess === win){
            guessInput.disabled = true; //this would stop you from entering a number further
            //this changes the value of the button to play again
                guessBtn.value = 'play again'; 
                guessBtn.className += 'play-again'; //this appends to the class name
            setMessage(`${win} is correct!! You sharp!!`, 'green');
        }else{
            //guesses left counting down
            guessLeft -= 1;
            if(guessLeft === 0){ //i.e game Over, lost
                guessInput.disabled = true;
                //this changes the value of the button to play again
                    guessBtn.value = 'play again';
                    guessBtn.className += 'play-again'; //this gives it this class as long as the value has changed. you wont find this class when the value of the btn is submit
                setMessage(`Try am again, You no too sharp!!, the number na ${win} `, 'red');
            }else{
                //still have guesses left
                guessInput.value = '';
                if (guess > win) {
                    setMessage(`${guess} is incorrect!! Your guess is too high. You have ${guessLeft} guesses left!!.`, 'red');
                } else {
                    setMessage(`${guess} is incorrect!! Your guess is too low. You have ${guessLeft} guesses left!!.`, 'red');
                }
            }  
        }
        
    }

});

function randNum(min, max){
   let randNo =  Math.floor((Math.random() * max) + min);
   return randNo;
}

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
    guessInput.style.borderColor = color;
}
