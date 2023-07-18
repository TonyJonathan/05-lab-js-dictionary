const def = document.querySelectorAll('#definition > .flex > p');
const exemple = document.querySelectorAll('#examples > .flex > p');
const synonym = document.querySelectorAll('#synonyms > .flexRow > .flex > p');
const antonym = document.querySelectorAll('#antonyms > .flexRow > .flex > p');

const defCircle = document.querySelectorAll('#definition > .flex > .blackcircle');
const exampleCircle = document.querySelectorAll('#examples > .flex > .blackcircle');
const synonymCircle = document.querySelectorAll('#synonyms > .flexRow > .flex > .blackcircle');
const antonymCircle = document.querySelectorAll('#antonyms > .flexRow > .flex > .blackcircle');


const word = document.querySelector('#mot > p:nth-child(1)'); 
const phonetics = document.querySelector('#mot > p:nth-child(2)');
const partOfSpeech = document.querySelector('#mot > p:nth-child(3)');


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
})}


function searchButton(){
    if(searchBar.value != ""){

    definition.style.display = 'none'; 
    examples.style.display = 'none'; 
    synonyms.style.display = 'none'; 
    antonyms.style.display = 'none'; 
    mot.style.display = 'flex'; 
    blackline.hidden =false; 
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
    if (response.ok) {
      return response.json(); // Convertir la réponse en JSON
    } 
  })
  .then(data => {

    word.textContent= data[0].word; 
    phonetics.textContent = data[0].phonetic; 
    partOfSpeech.textContent = data[0].meanings[0].partOfSpeech; 
     
    let tableauDef = data[0].meanings[0].definitions; 
    let tableauExample = findExample(data[0].meanings[0].definitions); 
    let tableauSynonym = findSynonyms(data[0].meanings[0].definitions); 
    let tableauAntonym = findAntonyms(data[0].meanings[0].definitions); 
    
    function findExample(i){      // trouve tous les exemples dans les .definitions sans afficher les vides // 
        var examplesResult = [];    
        i.forEach(element => {
            if(element.example != undefined ){
                examplesResult.push(element.example);
            }
        });

        return examplesResult; 
        
    }

     

    // pour les synonyms// synonymResult.push(element.synonyms);

    function findSynonyms(i){      // trouve tous les exemples dans les .definitions sans afficher les vides // 
        var synonymResult = [];    
        i.forEach(element => {
            if(element.synonyms != "" ){

                element.synonyms.forEach(sousElement => {
                    synonymResult.push(sousElement);
                });
                
            }
        });

        return synonymResult; 
    }

    function findAntonyms(i){      // trouve tous les exemples dans les .definitions sans afficher les vides // 
        var antonymResult = [];    
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

    
    console.log(tableauExample); 
    console.log(tableauSynonym); 
    console.log(tableauAntonym); 

    
    console.log(data[0].meanings[0].definitions.synonyms)
    console.log(data[0].meanings[0].definitions); 
    console.log(data[0].meanings[0].definitions.example); 

    function retrieve(i){

        function showQuery(a){
            let defSlot = eval('def[' + a + ']');
            let defNumber = eval('data[0].meanings[0].definitions['+ a +'].definition');
            let defCircleNumber = eval('defCircle[' + a + ']'); 

            defSlot.textContent = "";
            addInfo(defSlot, defNumber);
            defCircleNumber.style.display = 'block'; 

            

            
           

            console.log(defSlot); 
         
        }
       
        i.forEach(element => {
            
        showQuery(element);
        })
    }

    retrieve(convertElementInNumber(tableauDef)); 
    
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
   

}

}

search.addEventListener('click', searchButton); 


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
            console.log('hihi'); 
        }
        }
        
    }



buttonRow.addEventListener('click', change); 







 



 




