const container = document.querySelector('.container');
const logo = document.querySelector('#header > img:nth-child(1)');
const darkLogo = document.querySelector('#header > img:nth-child(6)');
const circle = document.querySelector('.circle');
const rectangle = document.querySelector('.rectangle'); 
const searchBar = document.querySelector('.inputValid');
const searchWen = document.querySelector('.search');
const slogan = document.querySelector('.typewritter > p:nth-child(1)');
const cursor = document.querySelector('.cursor'); 
const gears = document.querySelector('#header > img:nth-child(10)'); 

const label1 = document.querySelector('label'); 
const label2 = document.querySelector('#buttonRow > .button:nth-child(2) > label'); 
const label3 = document.querySelector('#buttonRow > .button:nth-child(3) > label'); 
const label4 = document.querySelector('#buttonRow > .button:nth-child(4) > label'); 
const line = document.querySelector('.line'); 
const darkWord = document.querySelector('#mot > p:nth-child(1)');
const soundLogo = document.querySelector('#mot > img:nth-child(4)');
const darkBullet = document.querySelectorAll('.blackcircle, #blackline'); 
const darkResponse = document.querySelectorAll('.text, .textTitle');
const modalContent = document.querySelector('.modalContent'); 
const labelModal1 = document.querySelector('.modalContent > .buttonModal:nth-child(2) > label'); 
const labelModal2 = document.querySelector('.modalContent > .buttonModal:nth-child(3) > label'); 
const labelModal3 = document.querySelector('.modalContent > .buttonModal:nth-child(4) > label'); 


export function darkMode() {

    container.classList.toggle('blackContainer'); 
    rectangle.classList.toggle('darkRectangle'); 
    circle.classList.toggle('darkCircle'); 
    slogan.classList.toggle('Slogan');
    slogan.classList.toggle('darkSlogan');
    cursor.classList.toggle('darkCursor');
    label1.classList.toggle('darkLabel'); 
    label2.classList.toggle('darkLabel'); 
    label3.classList.toggle('darkLabel'); 
    label4.classList.toggle('darkLabel'); 
    line.classList.toggle('darkLine'); 
    logo.classList.toggle('clearLogo');
    darkLogo.classList.toggle('darkLogo');
    searchBar.classList.toggle('darkSearchBar'); 
    searchWen.classList.toggle('darkSearch'); 
    darkWord.classList.toggle('darkWord'); 
    gears.classList.toggle('darkGears');
    labelModal1.classList.toggle('darkLabelModal');
    labelModal2.classList.toggle('darkLabelModal');
    labelModal3.classList.toggle('darkLabelModal');
    modalContent.classList.toggle('darkModalContent'); 
    soundLogo.classList.toggle('darkSoundLogo'); 

    darkResponse.forEach(element =>{
        element.classList.toggle('darkText'); 
    })

    if(rectangle.classList.value == 'rectangle'){
        darkBullet.forEach(element =>{
            element.style.backgroundColor = '#2B2B2B';
        })
    } else {
        darkBullet.forEach(element =>{
            element.style.backgroundColor = '#E3E3E3';
        })
    }

}