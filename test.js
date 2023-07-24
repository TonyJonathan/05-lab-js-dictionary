element.addEventListener('click', addWordToSearchButton);



function synonymsAndAntonymsClickables(){

  
    synonymsAndAntonyms.forEach(element =>{
        if(element.target == true){
            
         
         console.log(element);
        }
    });

  
}

document.addEventListener('click', synonymsAndAntonymsClickables); 



function addWordToSearchButton(event) {
    const clickedElement2 = event.target; // Récupérer l'élément cliqué
    searchBar.textContent = clickedElement2.textContent;
    
    searchButton();