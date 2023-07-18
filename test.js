let exampleSlot = eval('example[' + a + ']'); 
            let exampleNumber = eval('data[0].meanings[0].definitions['+ a +'].example')
            let exampleCircleNumber = eval('exampleCircle[' + a + ']');
            
            exampleSlot.textContent = ""; 
            addInfo(exampleSlot, exampleNumber);
            exampleCircleNumber.style.display = 'block'; 