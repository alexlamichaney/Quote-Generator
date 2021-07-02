//Select DOM elements
const quoteContainer  = document.querySelector('.quote-container');
const quoteBox  = document.querySelector('.quote-text');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const newQuoteBtn = document.querySelector('.new-quote');
const twitterBtn = document.querySelector('.twitter-button');
const loader = document.querySelector('#loader');

//make qoute array
let apiQuotes = [];

//show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    loading();
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Determine if author is available
    if(!quote.author){
        authorText.textContent = "Anonymous";
    }else{
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    //Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quote from API
async function getQuote(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        quoteBox.textContent = "Sorry, No quotes available currently"
        authorText.textContent = ""
        console.log('whoops, no quote', error);
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuote();