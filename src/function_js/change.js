const gears = document.querySelector('#header > img:nth-child(10)'); 

export function change(){

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

            if(value_3.checked == true && gears.offsetLeft < 361){
                synonyms.style.display = 'flex'; 
            } else if (value_3.checked == true && gears.offsetLeft > 361){

                synonyms.style.display = 'block';
            }

            if(value_4.checked == true && gears.offsetLeft < 361){
                antonyms.style.display = 'flex'; 
            } else if (value_4.checked == true && gears.offsetLeft > 361){

                antonyms.style.display = 'block';
            }
       
        }
        }
    }

    
// la fonction mediaQueryChange sert à changer la dispostion des flexRow dans synonyms et antonyms si le mediaquery est au dessus ou en dessous de 426px, le addEventlistener detecteras si le media query change et appliquera la fonction

    export function mediaQueryChange(event) {
        if (value_3.checked == true && event.matches) {
          // Le MediaQuery correspond à la condition spécifiée (max-width: 425px)
          synonyms.style.display = 'flex'; 
        } else if(value_3.checked == true && event.matches == false) {
          // Le MediaQuery ne correspond pas à la condition spécifiée
          synonyms.style.display = 'block'; 
        } else if (value_4.checked == true && event.matches){
            antonyms.style.display = 'flex'; 
        } else if(value_4.checked == true && event.matches == false) {
      
            antonyms.style.display = 'block'; 
          }
    }