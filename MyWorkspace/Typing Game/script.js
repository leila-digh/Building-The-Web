const quotes = [
    "There are more people who wish to be loved than there are who are willing to love.",
    "Great loves too must be endured.",
    "Courage Is a Love Affair with the Unknown",
    "If I love myself I love you. If I love you I love myself.",
    "Duty makes us do things well, but love makes us do them beautifully.",
    "Sorrow is how we learn to love.",
    "We take care of the future best by taking care of the present now.",
    "Heal the past, live the present, dream the future.",
    "The future depends on what you do today.",
    "Go for it now. The future is promised to no one.",
    "Even the smallest person can change the course of the future.",
];

let words = [];
let wordIndex = 0;

let startTime = Date.now();

//page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const userInputElement = document.getElementById("user-in");

document.getElementById("start").addEventListener("click", () => {
    // get a quote at random, generate a random index, const
    let randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // put quote in an array of words
    words = quote.split(" ");
    // reset the word index
    wordIndex = 0;

    // span class to add words

    // convert to a string to add to the inner html
    function toSpan(words) {
        let spanwords = [];
        for (let i = 0; i < words.length; i++) {
            spanwords.push(`<span>${words[i]} </span>`);
        }
        quoteElement.innerHTML = spanwords.join(" ");
    }

    toSpan(words);

    //clear previous messages
    messageElement.innerText = "";
    //clear the textbox
    userInputElement.value = "";

    //hilight the first word
    quoteElement.querySelectorAll("span")[wordIndex].className = "highlight";
    //set focus (set the cursor on this element now)
    userInputElement.focus();

    // start the timer
    startTime = new Date().getTime();
});

userInputElement.addEventListener("input", (e) => {
    //get currentword
    const currentWord = words[wordIndex];
    //current user input
    const userInput = userInputElement.value;

    if (userInput === currentWord && wordIndex === words.length - 1) {
        //the end
        const elapsedTime = new Date().getTime() - startTime;
        const message = `You finished in ${elapsedTime / 1000} seconds`;
        messageElement.innerText = message;
    } else if (userInput.endsWith(" ") && userInput.trim() === currentWord) {
        
        wordIndex++;
        userInputElement.value = "";
        userInputElement.className = "";

        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.children) {
            wordElement.className = "";
        }
        // highlight the new word
        quoteElement.children[wordIndex].className = "highlight";
        console.log("WordIndex" + wordIndex);
    } else if (currentWord.startsWith(userInput)) {
        // currently correct
        // highlight the next word
        userInputElement.className = "";
    } else {
        // error state
        userInputElement.className = "error";
    }
});
