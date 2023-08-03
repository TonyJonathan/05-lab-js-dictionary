import { hide, hideElements, clear } from "./function_js/hideAndClear.js";
import { findExample, findSynonyms, findAntonyms, addInfo, convertElementInNumber } from "./function_js/searchAndAdvertise.js";
import { change, mediaQueryChange } from "./function_js/change.js";
import { darkMode } from "./function_js/darkMode.js";
import { write } from "./function_js/slogan.js"

const def = document.querySelectorAll('#definition > .flex > p');
const exemple = document.querySelectorAll('#examples > .flex > p');
const synonym = document.querySelectorAll('#synonyms > .flexRow > .flex > p');
const antonym = document.querySelectorAll('#antonyms > .flexRow > .flex > p');
const errorMessage = document.querySelector('#header > p:nth-child(7)'); 
const synonymsAndAntonyms = document.querySelectorAll('#synonyms > .flexRow > .flex > p, #antonyms > .flexRow > .flex > p');

const defCircle = document.querySelectorAll('#definition > .flex > .blackcircle');
const exampleCircle = document.querySelectorAll('#examples > .flex > .blackcircle');
const synonymCircle = document.querySelectorAll('#synonyms > .flexRow > .flex > .blackcircle');
const antonymCircle = document.querySelectorAll('#antonyms > .flexRow > .flex > .blackcircle');

const word = document.querySelector('#mot > p:nth-child(1)'); 
const phonetics = document.querySelector('#mot > p:nth-child(2)');
const partOfSpeech = document.querySelector('#mot > p:nth-child(3)');
const lienAudio = document.querySelector('#header > p:nth-child(8)');

const rectangle = document.querySelector('.rectangle'); 
const searchBar = document.querySelector('.inputValid');
const searchWen = document.querySelector('.search');
const gears = document.querySelector('#header > img:nth-child(10)'); 

const label1 = document.querySelector('label'); 
const soundLogo = document.querySelector('#mot > img:nth-child(4)');

const modal = document.querySelector('.modal'); 
const modalContent = document.querySelector('.modalContent'); 
const labelModal1 = document.querySelector('.modalContent > .buttonModal:nth-child(2) > label'); 
const inputModal1 = document.querySelector('.modalContent > .buttonModal:nth-child(2) > input'); 
const labelModal2 = document.querySelector('.modalContent > .buttonModal:nth-child(3) > label'); 
const inputModal2 = document.querySelector('.modalContent > .buttonModal:nth-child(3) > input'); 
const labelModal3 = document.querySelector('.modalContent > .buttonModal:nth-child(4) > label'); 
const inputModal3 = document.querySelector('.modalContent > .buttonModal:nth-child(4) > input'); 

const buttonRow = document.querySelector('#buttonRow'); 

const typewritter = document.querySelector('.typewritter > p'); 
const cursor = document.querySelector(".cursor");

hide(mot, definition, examples, synonyms, antonyms); 

blackline.hidden =true; 
value_1.checked = true;

function searchButton(){
    if(searchBar.value != ""){
        typewritter.hidden = true;
        cursor.style.display= 'none';  
        hide(definition, examples, synonyms, antonyms);
        hideElements(defCircle, exampleCircle, synonymCircle, antonymCircle)
        clear(def, exemple, synonym, antonym);
        soundLogo.hidden = true;
        var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchBar.value;

        fetch(url)
        .then(response => {
            // Gérer la réponse du serveur
            if(!response.ok){
                errorMessage.textContent = 'Your word is unvalid'; 
                mot.style.display = 'none'; 
                blackline.hidden =true;
            } 
            
            if (response.ok) {
                mot.style.display = 'flex'; 
                blackline.hidden =false;
                errorMessage.textContent = ''; 
                return response.json(); // Convertir la réponse en JSON
            } 
        })
           
        .then(data => {
            
            word.textContent= data[0].word; 
            phonetics.textContent = data[0].phonetic; 
            partOfSpeech.textContent = data[0].meanings[0].partOfSpeech; 
            lienAudio.textContent = data[0].phonetics[0].audio; 
            const lienAudioURL = lienAudio.textContent;
            const audioPlayer = document.querySelector('#audioPlayer');

            if(lienAudioURL != ""){
                soundLogo.hidden = false;
            }

            soundLogo.addEventListener('click', () =>{

                audioPlayer.src = lienAudioURL;
                audioPlayer.load();
                audioPlayer.play(); 
            }); 

            let tableauDef = data[0].meanings[0].definitions; 
            let tableauExample = findExample(data[0].meanings[0].definitions); 
            let tableauSynonym = findSynonyms(data[0].meanings[0].definitions); 
            let tableauAntonym = findAntonyms(data[0].meanings[0].definitions); 

            findExample(data[0].meanings[0].definitions); 
            findSynonyms(data[0].meanings[0].definitions);
            findAntonyms(data[0].meanings[0].definitions);  


            // la fonction retrieve est composée de sous-fonctions qui permettent d'aller rechercher dans la data de l'API les informations concernant les def-ex-syn-ant et de les ajouter au bon endroit en fonction de leurs nombres et de la fonction convertElementInNumber, elle permet aussi de transformer en "" les p qui ne sont pas concernés et leurs puces. // 

            function retrieve(w, x, y, z){

                function showDefinitions(a){
                    let defSlot = eval('def[' + a + ']'); // correspond à la partie html
                    let defNumber = eval('data[0].meanings[0].definitions['+ a +'].definition'); // correspond a la partie data récupérée 
                    let defCircleNumber = eval('defCircle[' + a + ']'); 

                    defSlot.textContent = "";
                    addInfo(defSlot, defNumber);
                    defCircleNumber.style.display = 'block'; 
                }

                function showExamples(a){
                    let exampleSlot = eval('exemple[' + a + ']');
                    let exampleNumber = eval('tableauExample['+ a +']');
                    let exampleCircleNumber = eval('exampleCircle[' + a + ']'); 

                    exampleSlot.textContent = "";
                    addInfo(exampleSlot, exampleNumber);
                    exampleCircleNumber.style.display = 'block'; 
                }

                function showSynonyms(a){
                    let synonymSlot = eval('synonym[' + a + ']');
                    let synonymNumber = eval('tableauSynonym['+ a +']');
                    let synonymCircleNumber = eval('synonymCircle[' + a + ']'); 

                    synonymSlot.textContent = "";
                    addInfo(synonymSlot, synonymNumber);
                    synonymCircleNumber.style.display = 'block'; 
                }

                function showAntonyms(a){
                    let antonymSlot = eval('antonym[' + a + ']');
                    let antonymNumber = eval('tableauAntonym['+ a +']');
                    let antonymCircleNumber = eval('antonymCircle[' + a + ']'); 

                    antonymSlot.textContent = "";
                    addInfo(antonymSlot, antonymNumber);
                    antonymCircleNumber.style.display = 'block';  
                }
            
                w.forEach(element => {
                    showDefinitions(element);
                });

                x.forEach(element => {
                    showExamples(element);
                });

                y.forEach(element => {
                    showSynonyms(element);
                });

                z.forEach(element => {
                    showAntonyms(element);
                });
            
            }

            retrieve(convertElementInNumber(tableauDef), convertElementInNumber(tableauExample), convertElementInNumber(tableauSynonym), convertElementInNumber(tableauAntonym)); 

        })

        mot.style.display = 'flex'; 
        change(); 
         
    } else {
        errorMessage.textContent = "Enter a word please"
    }

}

searchWen.addEventListener('click', searchButton); 
buttonRow.addEventListener('click', change); 
const mediaQuery = window.matchMedia('(max-width: 426px)');
mediaQuery.addEventListener('change', mediaQueryChange);
rectangle.addEventListener('click', darkMode); 

function eraseErrorMessage(){
    errorMessage.textContent = "";
}

searchBar.addEventListener('input', eraseErrorMessage); 

document.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter') {
        searchButton();
    }
});

  function synonymsAndAntonymsClickables(){

        synonymsAndAntonyms.forEach(element => {
            element.addEventListener('click', () => {
            searchBar.value = element.textContent;
            searchButton();
            label1.click(); 
            });
        });
    };

  document.addEventListener('click', synonymsAndAntonymsClickables);

  function openModal(){
    modal.style.display = 'block'; 
  }

  function closeModal(){
    modal.style.display = 'none'; 
  }

  gears.addEventListener('click', openModal);

  window.addEventListener('click', (event) =>{
    if(event.target !== modalContent && event.target !== gears && event.target !== inputModal1 && event.target !== labelModal1  && event.target !== inputModal2 && event.target !== labelModal2  && event.target !== inputModal3 && event.target !== labelModal3){
        closeModal(); 
    }
  })

window.addEventListener('click', (event) =>{
    if(event.target == inputModal1){
        document.body.style.fontFamily = 'Merriweather Sans, sans-serif';
    }
    if(event.target == inputModal2){
        document.body.style.fontFamily = 'EB Garamond, serif';
    }
    if(event.target == inputModal3){
        document.body.style.fontFamily = 'JetBrains Mono, monospace';
    }
});

inputModal1.click(); 


