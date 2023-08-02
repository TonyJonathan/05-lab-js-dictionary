const def = document.querySelectorAll('#definition > .flex > p');
const searchBar = document.querySelector('.inputValid');
const synonymsAndAntonyms = document.querySelectorAll('#synonyms > .flexRow > .flex > p, #antonyms > .flexRow > .flex > p');
 
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


