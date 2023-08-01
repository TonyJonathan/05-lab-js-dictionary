const def = document.querySelectorAll('#definition > .flex > p');
 
 // trouve tous les exemples dans les .definitions sans afficher les vides //
   
 export function findExample(i){       
    var examplesResult = [];    
    i.forEach(element => {
        if(element.example != undefined ){
            examplesResult.push(element.example);
        }
    });

    return examplesResult; 
    
}

// pour les synonymes// 

export function findSynonyms(i){   

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

export function findAntonyms(i){     
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




export function addInfo(a, b){ // sert a ajouter les definition-exemples... si il y'en a sinon affiche ""// 
    
    if(typeof(b) == "string"){
        a.textContent = b;
        return a;
    } else {
        a.textContent = ""; 
        return a;
    }
}

export function convertElementInNumber(i){ // sert à savoir le nombre de définitions-exemples... pour pouvoir ajouter les ajouter// 

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


// la fonction retrieve est composée de sous-fonctions qui permettent d'aller rechercher dans la data de l'API les informations concernant les def-ex-syn-ant et de les ajouter au bon endroit en fonction de leurs nombres et de la fonction convertElementInNumber, elle permet aussi de transformer en "" les p qui ne sont pas concernés et leurs points. //


// pas encore utiliser dans l'index.js//

export function retrieve(w, x, y, z){

    const searchBar = document.querySelector('.inputValid');
    const exemple = document.querySelectorAll('#examples > .flex > p');
    const synonym = document.querySelectorAll('#synonyms > .flexRow > .flex > p');
    const antonym = document.querySelectorAll('#antonyms > .flexRow > .flex > p');
    const defCircle = document.querySelectorAll('#definition > .flex > .blackcircle');
    const exampleCircle = document.querySelectorAll('#examples > .flex > .blackcircle');
    const synonymCircle = document.querySelectorAll('#synonyms > .flexRow > .flex > .blackcircle');
    const antonymCircle = document.querySelectorAll('#antonyms > .flexRow > .flex > .blackcircle');
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchBar.value;



    fetch(url)
    .then(response => {
        // Gérer la réponse du serveur
        
        if (response.ok) {
            return response.json(); // Convertir la réponse en JSON
        } 
    })

    .then(data => {

        let tableauDef = data[0].meanings[0].definitions; 
        let tableauExample = findExample(data[0].meanings[0].definitions); 
        let tableauSynonym = findSynonyms(data[0].meanings[0].definitions); 
        let tableauAntonym = findAntonyms(data[0].meanings[0].definitions); 

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

})}


