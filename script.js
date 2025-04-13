const typingtext = document.querySelector(".typing-text p");
const inputtext = document.querySelector(".wrapper .input-feild");
const mistake = document.querySelector(".mistake span");
const time = document.querySelector(".time span b");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");



let timer;
let maxTime = 60;
let mistakeCount = 0;
let charIndex = 0;
let timeleft = maxTime;
let isTyping = false;

function loadParagraph(){
    const paragraph = [
        "The old clock tower chimed loudly as the sun dipped below the horizon.",
        "A cat wearing sunglasses strutted confidently through the busy marketplace.",
        "Without warning, the paper airplane soared across the room and hit the whiteboard.", 
        "She found a mysterious key buried beneath the ancient oak tree in her backyard.", 
        "Every Sunday, they made pancakes shaped like animals just for fun."
    ];
    const randomindex = Math.floor(Math.random()*paragraph.length);
    typingtext.innerHTML='';
    for (const char of paragraph[randomindex]){
        console.log(char);
        typingtext.innerHTML += `<span>${char}</span>`
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>inputtext.focus());
    typingtext.addEventListener('click',()=>inputtext.focus());
}


function initTyping(){
    const char=typingtext.querySelectorAll('span');
    const typedchar=inputtext.value.charAt(charIndex);
    if(charIndex < char.length && timeleft > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }




        if(char[charIndex].innerText === typedchar){
            char[charIndex].classList.add('correct');
            console.log('correct');
            
        }
        else{
            mistakeCount++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
            
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistake.innerText = mistakeCount;
        cpm.innerText = charIndex - mistakeCount;
    }
    else{
        clearInterval(timer);
        inputtext.value = '';
    }
}
function initTimer(){
    if(timeleft > 0){
        timeleft--;
        time.innerText = timeleft;
        let wpmvalue = Math.round(((charIndex - mistakeCount) / 5) / (maxTime - timeleft));
        wpm.innerText = wpmvalue;
    }
    else{
        clearInterval(timer);
    }
}


function reset(){
    loadParagraph();
    clearInterval(timer);
    timeleft = maxTime;
    time.innerText = timeleft;
    inputtext.value = '';
    charIndex = 0;
    mistakeCount = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
}

inputtext.addEventListener('input',initTyping);
btn.addEventListener('click',reset);

loadParagraph();