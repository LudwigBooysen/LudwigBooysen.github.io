
// Vars

const emojis = ["💖", "💩", "💋", "😘", "❤️", "💘"];
const animations = ["fall-1", "fall-2", "fall-3"];

let last = { x: 0, y: 0 };
let current = { x: 0, y: 0 };

let mouseX = 0;
let mouseY = 0;

let showEmoji = true;
let showGlow = true;

let catCreated = false;

// Event Listeners + Functions

window.onload = () => {
    // Yes button logic
    const yesBtn = document.getElementById("Yes-Button");

    yesBtn.addEventListener("click", yesBtnClick);
    yesBtn.addEventListener("mouseover", yesBtnHover);
    yesBtn.addEventListener("mouseout", yesBtnExit);

    // No button logic

    const noBtn = document.getElementById("No-Button");

    setInterval(() => {
        let noBtnRect = noBtn.getBoundingClientRect();
        let noBtnPosition = { x: noBtnRect.left + noBtnRect.width / 2, y: noBtnRect.top + noBtnRect.height / 2 };

        if(calcDistance(current, noBtnPosition) < 100) {

            let moveX = (Math.random() * 200) + 100;
            let moveY = (Math.random() * 200) + 100;

            if(current.x < noBtnPosition.x) moveX = -moveX;
            if(current.y < noBtnPosition.y) moveY = -moveY;

            Math.random() < 0.1 ? playSound("noBtn") : null;

            const keyframes = {
                transform: `translate(${moveX}px, ${moveY}px)`
            }

            noBtn.animate(keyframes, {
                duration: 500,
                fill: "forwards",
                easing: "ease-out"
            });

        }
    }, 100);
}

window.onmousemove = e => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    current = { x: mouseX, y: mouseY };

    showGlow ? createGlow() : null;

    if(calcDistance(last, current) >= 100) {
        showEmoji ? createEmoji() : null;
    }

}

// Tool Functions

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function calcDistance(last, current) {
  const deltaX = current.x - last.x;
  const deltaY = current.y - last.y;
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

function playSound(soundName) {


    if (soundName === "noBtn") {
        const audio = new Audio('sounds/noBtn.mp3');
        audio.volume = 0.25;
        audio.play();
    } else if (soundName === "yesBtn") {
        const audio = new Audio('sounds/yesBtn.mp3');
        audio.volume = 0.10;
        audio.play();
    }
}

// Draw Functions

function createEmoji() {
    const dot = document.createElement("div");

    dot.className = "dot";

    dot.innerHTML = `${selectRandom(emojis)}`;
    dot.style.animationName = selectRandom(animations);

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    document.body.appendChild(dot);

    setTimeout(() => document.body.removeChild(dot), 1000);

    last = current;
}

function createGlow() {
    const glowDot = document.createElement("div");

    glowDot.className = "glow-point";
    glowDot.style.left = `${mouseX}px`;
    glowDot.style.top = `${mouseY}px`;

    document.body.appendChild(glowDot);

    setTimeout(() => document.body.removeChild(glowDot), 250);
}

function yesBtnHover() {
    // Validation
    if (catCreated) return;

    // Hide other effects
    showEmoji = false;
    showGlow = false;

    // Show curious cat
    const cat = document.createElement("img");

    cat.className = "cat";
    cat.src = "images/happy-cat-silly-cat.gif";

    catCreated = true;

    document.body.appendChild(cat);

}

function yesBtnExit() {
    // Validation
    if (!catCreated) return;

    // Show other effects
    showEmoji = true;
    showGlow = true;

    // Remove cat
    const cat = document.querySelector(".cat");
    document.body.removeChild(cat);

    catCreated = false;
}

function yesBtnClick() {

    // PLay sound
    playSound("yesBtn");

    showEmoji = false;
    showGlow = true;

    // Animate page
    // remove btns, remove text, bring up love letter, increase size of box
    // Get all elements to remove
    const cat = document.querySelector(".cat");
    const yesBtn = document.getElementById("Yes-Button");
    const noBtn = document.getElementById("No-Button");
    const text = document.getElementById("Question-Text");
    const textBox = document.getElementById("Question-Box-Container");
    const textBox2 = document.getElementById("Question-Box");

    // DO cat stuff
    cat.src = "images/dancing-cat.gif";
    const catImgMoveUp = {
        transform: "translateY(-400px)"
    }

    cat.animate(catImgMoveUp, {
        duration: 800,
        fill: "forwards"
    });

    // Do button stuff
    yesBtn.remove();
    noBtn.remove();

    // Do Text stuff
    text.remove();

    const boxBigger = {
        height: "80%"
    }

    textBox.animate(boxBigger, {
        duration:  1250,
        fill: "forwards"
    });

    // Love letter
    
    const letter = document.createElement("div");

    letter.style.font = "Arial";
    letter.innerHTML = "To: My Poefie,<br>😻👀🤰👽💨🤰👽💩👾🪓😽😽🪓🍑👽👀🐈👽🫁💌😽👽😗👀🧠👽🍑👀👽💝🤰👽💌🍑👽💩💌👀👽😘💨😘💍💌😗🥰🍑🧠👀👽🥰😍👽🫁😘🧠👽💌👀💨😘😗💩👽🫀💌👾👽🐈😘😗👽🫀👾😘🎵👽👀🐈👽🫁👀👀🧠👽🪓😗🍑👽💘😘🐈😽👀💌👽💘😘💌👀👽👀😗👽💩💌🧠👽🥰😘😘😗👽😗💌👀👽😘😽🧠🤰💩👽💘😘💌👀👽🥰🪓👀💩👽😗💌👀👽💨😘😘👾👽💝🤰👽💨🪓👀🧠👽🧠👀😗💨💌😗🍑🧠👀👽😗👀🧠👽🫁👀👀🧠👽👀🐈👽🍑😘😽👽😘😽🧠🤰💩👽😽💌👀😍👽🫁👀👀🍑👽🫀💌👾👽💝🪓🐜👽💨😘😘🐈👽😗💌👀👽🍑😘😘🐈👽🫁😘🧠👽😗💌👀🎵👽👀🐈👽🍑😘😽👽😘😽🧠🤰💩👽😗👀🧠👽😽👀🫁👀👽🫀💌👾👽💝🪓🐜👽👀😗👽💘😘💌👀👽💩😘👀👽💌🍑👽💩💌🧠👽😗👀🧠👽💝🤰👽🫁😘🧠👽💨🤰👽💨🪓🧠💌🫀😘🧠👀👽🪓💨👽🥰🪓👀💩👽🧠👀👽💩🪓👀😗🎮👽🍑🪓🪓🍑👽💘🫀👽😻💌👀👾💩💌👀👽🥰💌😍🧠👽🫁😘🍑👽👀🐈👽🍑🪓👽👀💖💌🧠👀💩👽🪓💨👽🧠👀👽💨😘😘🐈👽😗👀🧠👽🫀💌👾👽💝🪓🐜🎵👽💩😘😗🐈💌👀👽🫀💌👾👽😘😽😽👀🍑👽🫁😘🧠👽💝🤰👽😘😽🧠🤰💩👽🫀💌👾👽💨🤰👽💩🪓👀😗👽👀😗👽🫀💌👾👽😘😽😽👀🍑👽🫁😘🧠👽💝🤰👽😘😽👽💨🪓👀🍑👽💩👀🐜👾👽💨😘😘🐈👽💨👀🧠👽💨🤰👽🍑😘😘💨🎮👽👀🐈👽😻👀🧠👽😗👽😽👀👀😍👽🧠🤰💩👽🍑👀👽💘👀🍑🧠👽💨👀💨🪓👾💌👀🍑👽😘😽👽🍑😘😘💨👽💝🪓🐜👽🥰👀😻😘😘💩👽👀😗👽👀🐈🍑👽💝💨👾👽💩😘🧠👽👀🐈👽🪓🐈👽😗💌👀👽🥰👀😗🪓👀🥰👽💩💌🧠👽👀👩‍🔬🤮👾👀🍑🍑👽💩😘🧠👽👀🐈👽💩💌🧠👽😘😽👽🥰👀😻😘💩👽😻👀🧠👽😗💌👀🎵👽👀🐈👽💌🍑👽🪓🪓🐈👽💘😘💌👀👽💝💨👾👽🪓🪓👾👽😘😽😽👀👽🍑😽👀🥰🧠👀👽🥰🪓👀💩👽🫁😘🧠👽👀🐈👽😘😽👽🫀💌👾👽💝🪓🐜👽🥰👀🍑👀👽😻👀🧠🎮👽💝🤰👽💨🪓👀🧠👽🫁👀👀🧠👽👀🐈👽😻👀🧠👽💨👀👀🍑🧠👀👽🫀😘😗👽💩💌👀👽🧠🤰💩👽💩💌🧠👽😗🪓🪓💌🧠👽💘👀💩🪓👀😽👽😗💌👀👽👀😗👽💩😘🧠👽👀🐈👽🫁👀👀🧠👽👀🐈👽👀😗👽💝🤰👽🥰😘😘😗👽😻💌👀👾💩💌👀👽💌🍑🍑🐜👀🍑👽💩👀🐜👾👽🐈😘😗👽🫁👀👾🐈👽🫁😘😗🧠👽💩💌🧠👽💌🍑👽🫁🪓👾🧠😻👽💌🧠👽💨👀🧠👽💝🪓🐜🎵👽👀🐈👽💌🍑👽🍑🪓👽💘😘💌👀👽😽💌👀😍👽🫀💌👾👽💝🪓🐜👽👀😗👽💝🤰👽💨🪓👀🧠👽😘😘😗👽😻🪓🐜👽💝🪓🐜🍑👀😽😍👽🫁👀👀🍑👽👀😗👽😘😘😗🥰😘😘😗👽🍑🪓🪓🍑👽🫁😘🧠👽💝🪓🐜👽😗🪓🐜👽💩🪓👀😗👽🫁😘😗🧠👽💝🤰👽🥰😘😘😗👽😘💨😘💍💌😗🥰👽💩💌😗🥰👀👽💩🪓👀😗👽💌😗👽💩💌👀👽🫁👀👾👀😽💩👽🪓🪓🐈🎵👽🍑🪓👾👾🤰👽👀🐈👽🫁👀👀🧠👽💩💌👀👽🫁😘🍑👽💘😘💌👀👽🥰👾💌😗🥰👀👽💨😘😘👾👽👀🐈👽💘👀💩🪓👀😽👽👀😽🐈👀👽🫁🪓🪓👾💩🎵👽🤮🍑🎵👽💩💌👀👽🫁😘🍑👽👾🪓😗💩🪓💨👽😗👽🧠😻🪓🐜🍑😘😗💩👽😽💌😗👀🍑👽🪓😍👽💖🪓💩👀👽😗👀🧠👽🫀💌👾👽💝🪓🐜🎵";

    textBox2.appendChild(letter);

}