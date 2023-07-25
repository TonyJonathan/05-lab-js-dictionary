const def = document.querySelectorAll('#definition > .flex > p');
const exemple = document.querySelectorAll('#examples > .flex > p');
const synonym = document.querySelectorAll('#synonyms > .flexRow > .flex > p');
const antonym = document.querySelectorAll('#antonyms > .flexRow > .flex > p');
const errorMessage = document.querySelector('#header > p:nth-child(7)'); 
const synonymsAndAntonyms = document.querySelectorAll('#synonyms > .flexRow > .flex > p, #antonyms > .flexRow > .flex > p')

const defCircle = document.querySelectorAll('#definition > .flex > .blackcircle');
const exampleCircle = document.querySelectorAll('#examples > .flex > .blackcircle');
const synonymCircle = document.querySelectorAll('#synonyms > .flexRow > .flex > .blackcircle');
const antonymCircle = document.querySelectorAll('#antonyms > .flexRow > .flex > .blackcircle');


const word = document.querySelector('#mot > p:nth-child(1)'); 
const phonetics = document.querySelector('#mot > p:nth-child(2)');
const partOfSpeech = document.querySelector('#mot > p:nth-child(3)');
const lienAudio = document.querySelector('#header > p:nth-child(8)');



const container = document.querySelector('.container');
const logo = document.querySelector('#header > img:nth-child(1)');
const darkLogo = document.querySelector('#header > img:nth-child(6)');
const rectangle = document.querySelector('.rectangle'); 
const searchBar = document.querySelector('.inputValid');
const searchWen = document.querySelector('.search');
const slogan = document.querySelector('#header > p:nth-child(5)');
const gears = document.querySelector('#header > img:nth-child(10)'); 

const label1 = document.querySelector('label'); 
const label2 = document.querySelector('#buttonRow > .button:nth-child(2) > label'); 
const label3 = document.querySelector('#buttonRow > .button:nth-child(3) > label'); 
const label4 = document.querySelector('#buttonRow > .button:nth-child(4) > label'); 
const line = document.querySelector('.line'); 
const darkWord = document.querySelector('#mot > p:nth-child(1)');
const darkBullet = document.querySelectorAll('.blackcircle, #blackline'); 
const darkResponse = document.querySelectorAll('.text, .textTitle');

const soundLogo = document.querySelector('#mot > img:nth-child(4)');
const darkSoundLogo = document.querySelector('#mot > img:nth-child(5)');

const firstDef = document.querySelector('#definition > .flex > p:nth-child(2)')

const modal = document.querySelector('.modal'); 
const modalContent = document.querySelector('.modalContent'); 
const labelModal1 = document.querySelector('.modalContent > .buttonModal:nth-child(2) > label'); 
const inputModal1 = document.querySelector('.modalContent > .buttonModal:nth-child(2) > input'); 
const labelModal2 = document.querySelector('.modalContent > .buttonModal:nth-child(3) > label'); 
const inputModal2 = document.querySelector('.modalContent > .buttonModal:nth-child(3) > input'); 
const labelModal3 = document.querySelector('.modalContent > .buttonModal:nth-child(4) > label'); 
const inputModal3 = document.querySelector('.modalContent > .buttonModal:nth-child(4) > input'); 




mot.style.display = 'none'; 
blackline.hidden =true; 
definition.style.display = 'none'; 
examples.style.display = 'none'; 
synonyms.style.display = 'none'; 
antonyms.style.display = 'none'; 

value_1.checked = true;

function addInfo(a, b){ // sert a ajouter les definition-exemples... si il y'en a sinon affiche ""// 
    
    if(typeof(b) == "string"){
        a.textContent = b;
        return a;
    } else {
        a.textContent = ""; 
        return a;
    }
}

 

function convertElementInNumber(i){ // sert à savoir le nombre de définitions-exemples... pour pouvoir ajouter les ajouter// 

    if(i.length == 1){
        i = [0]; 
    }else if(i.length == 2){
        i = [0, 1]; 
    }else if(i.length == 3){
        i = [0, 1, 2]; 
    }else if(i.length == 4){
        i = [0, 1, 2, 3]; 
    }else if(i.length == 5){
        i = [0, 1, 2, 3, 4]; 
    }else if(i.length == 6){
        i = [0, 1, 2, 3, 4, 5]; 
    }else if(i.length == 7){
        i = [0, 1, 2, 3, 4, 5, 6]; 
    }else if(i.length >= 8){
        i = [0, 1, 2, 3, 4, 5, 6, 7]; 
    }

    return i;
}

function hideCircle(i){ // sert à cacher les points noirs si il n'y a pas de def-ex-anto-syn à coté// 
    i.forEach(element =>{
        element.style.display = "none";
    })
}

function clear (i){
    i.forEach(element => {
        element.textContent= ""; 
    })
}

function searchButton(){
    if(searchBar.value != ""){

    definition.style.display = 'none'; 
    examples.style.display = 'none'; 
    synonyms.style.display = 'none'; 
    antonyms.style.display = 'none'; 
     
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchBar.value;

    hideCircle(defCircle);
    hideCircle(exampleCircle);
    hideCircle(synonymCircle);
    hideCircle(antonymCircle);

    clear(def);
    clear(exemple);
    clear(synonym);
    clear(antonym);

    fetch(url)
    .then(response => {
        // Gérer la réponse du serveur
        if(!response.ok){
            errorMessage.textContent = 'Your word is unvalid, please try again'; 
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

        soundLogo.addEventListener('click', () =>{

            audioPlayer.src = lienAudioURL;
            audioPlayer.load();
            audioPlayer.play(); 
        }); 

        let tableauDef = data[0].meanings[0].definitions; 
        let tableauExample = findExample(data[0].meanings[0].definitions); 
        let tableauSynonym = findSynonyms(data[0].meanings[0].definitions); 
        let tableauAntonym = findAntonyms(data[0].meanings[0].definitions); 

        // trouve tous les exemples dans les .definitions sans afficher les vides //
        
        function findExample(i){       
            var examplesResult = [];    
            i.forEach(element => {
                if(element.example != undefined ){
                    examplesResult.push(element.example);
                }
            });

            return examplesResult; 
            
        }

        // pour les synonymes// 

        function findSynonyms(i){   

            let synonymResult = [];    
            i.forEach(element => {
                if(element.synonyms != "" ){

                    element.synonyms.forEach(sousElement => {
                        synonymResult.push(sousElement);
                    });
                    
                }
            });

            return synonymResult; 
        }

        // pour les antonymes// 

        function findAntonyms(i){     
            let antonymResult = [];    
            i.forEach(element => {
                if(element.antonyms != "" ){

                    element.antonyms.forEach(sousElement => {
                        antonymResult.push(sousElement);
                    });
                    
                }
            });

            return antonymResult; 
        }

        findExample(data[0].meanings[0].definitions); 
        findSynonyms(data[0].meanings[0].definitions);
        findAntonyms(data[0].meanings[0].definitions);  


        // la fonction retrieve est composée de sous-fonctions qui permettent d'aller rechercher dans la data de l'API les informations concernant les def-ex-syn-ant et de les ajouter au bon endroit en fonction de leurs nombres et de la fonction convertElementInNumber, elle permet aussi de transformer en "" les p qui ne sont pas concernés et leurs points. // 

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



    if(value_1.checked == true){

        definition.style.display = 'block'; 
    }

    if(value_2.checked == true){

        examples.style.display = 'block'; 
    }

    if(value_3.checked == true){

        synonyms.style.display = 'block'; 
    }

    if(value_4.checked == true){

        antonyms.style.display = 'block'; 
    }
   
    } else {
        errorMessage.textContent = "Enter a word please"
    }
}

searchWen.addEventListener('click', searchButton); 


function change(){
    if(value_1.checked == true || value_2.checked == true || value_3.checked == true || value_4.checked == true){
        if(mot.style.display == 'flex'){

            definition.style.display = 'none'; 
            examples.style.display = 'none'; 
            synonyms.style.display = 'none'; 
            antonyms.style.display = 'none'; 

        
            if(value_1.checked == true){

                definition.style.display = 'block'; 
            }

            if(value_2.checked == true){

                examples.style.display = 'block'; 
            }

            if(value_3.checked == true){

                synonyms.style.display = 'block'; 
            }

            if(value_4.checked == true){

                antonyms.style.display = 'block'; 
            }
        }
        }
    }

buttonRow.addEventListener('click', change); 

function darkModeImg(){
    if(rectangle.classList.value == 'rectangle'){
        soundLogo.style.display = 'block';
        darkSoundLogo.style.display = 'none';
        darkBullet.forEach(element =>{
            element.style.backgroundColor = '#2B2B2B';
        })
        
    } else {
        soundLogo.style.display = 'none';
        darkSoundLogo.style.display = 'block';
        
        darkBullet.forEach(element =>{
            element.style.backgroundColor = '#E3E3E3';
        })
    }
}

function darkMode() {

    container.classList.toggle('blackContainer'); 
    rectangle.classList.toggle('darkRectangle'); 
    slogan.classList.toggle('darkSlogan');
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
    console.log(rectangle.classList.value); 

    darkResponse.forEach(element =>{
        element.classList.toggle('darkText'); 
    })

    darkModeImg();
}

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

  gears.addEventListener('click', openModal);

  function closeModal(){
    modal.style.display = 'none'; 
  }

  window.addEventListener('click', (event) =>{
    if(event.target !== modalContent && event.target !== gears && event.target !== inputModal1 && event.target !== labelModal1  && event.target !== inputModal2 && event.target !== labelModal2  && event.target !== inputModal3 && event.target !== labelModal3){
        closeModal(); 
    }
  })


  