
export function hide(...arg){
    arg.forEach(element => {
        element.style.display= 'none';
    })
}


export function hideElements(...args){ // sert à cacher les points noirs si il n'y a pas de def-ex-anto-syn à coté// 
    args.forEach(element => {
        element.forEach(sousElement => {
            sousElement.style.display = "none"; 
        })
    })
}

export function clear (...args){
    args.forEach(element => {
        element.forEach(sousElement => {
            sousElement.textContent= "" ; 
        })
        
    })
}

