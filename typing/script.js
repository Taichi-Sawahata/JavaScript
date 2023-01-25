'user strict';
const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById('typeDisplay');
const typeinput =document.getElementById('type-Input');
const timer = document.getElementById('timer');

typeinput.addEventListener("input",()=>{
    const sentenceArray = typeDisplay.querySelectorAll("span");
   const arrayValue = typeinput.value.split("");

    let correct = true;
   sentenceArray.forEach((characterSpan,index) => {
    if(arrayValue[index] == null){
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove("incorrect");
        correct = false;
    }else if(characterSpan.innerText == arrayValue[index]){
        characterSpan.classList.add('correct');
        characterSpan.classList.remove("incorrect");
    }else{
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove('correct');
        correct = false;
    }
   })
   if(correct == true){
    RenderNextSentence();
   }
})


function GetRandomSentence(){
    return fetch( RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}


async function RenderNextSentence(){
    const sentence = await GetRandomSentence();
    console.log(sentence);
    // typeDisplay.innerText = sentence;
   let oneText = sentence.split("");
    oneText.forEach((character) => {
       const characterSpan = document.createElement("span");
       characterSpan.innerText = character;              
       typeDisplay.appendChild(characterSpan);        
    //    characterSpan.classList.add('correct');                   
    });

typeinput.value = '';
StartTimer();
}

let startTime;
let originTime = 30;
function StartTimer(){
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(()=>{
        timer.innerText = originTime - getTimerTime();
        if(timer.innerText <= 0) TimeUp();
    },1000)
}

function TimeUp(){
    RenderNextSentence();
}

function getTimerTime(){
    return  Math.floor(( new Date() - startTime) / 1000);
}

RenderNextSentence();

