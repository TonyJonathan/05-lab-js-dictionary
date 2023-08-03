const fullText = "Your linguistic guide, always at your fingertips.";
const time = 110; 

const typewritter = document.querySelector('.typewritter > p'); 
const cursor = document.querySelector(".cursor");
cursor.hidden = true; 
let cursorVisible = true;
const blinkRate = 500;

let index = 0;
let writingText = "";

export function write() {
 
    writingText = fullText.slice(0, ++index);
    typewritter.textContent = writingText + "|";

    if (index < fullText.length) {
        setTimeout(write, time);
    } else {
        typewritter.textContent = writingText;
        blinkCursor();
      }
}

function blinkCursor() {
    cursor.hidden = false; 
    cursorVisible = !cursorVisible;
    cursor.style.visibility = cursorVisible ? 'visible' : 'hidden';
    setTimeout(blinkCursor, blinkRate);
}

write();