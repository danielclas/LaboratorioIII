import {Table} from './table.js';

let form = document.getElementById('form');
let keys = Table.keys();

export class Form{

    static formToObject(){

        let obj = {};
        let inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            let value;
            let index = keys.indexOf(input.name);

            if(input.type == 'radio'){
                if(input.checked){
                    value = input.value;
                    if(obj) obj[input.name] = input.value;
                }
            }else{
                if(!this.validInput(input)) obj = undefined;                    
                if(obj) obj[input.name] = input.value;
            }               
        });

        return obj;
    }

    static cleanForm(){

        let inputs = document.querySelectorAll('input');

        inputs.forEach(input=>{
            if(input.type == 'radio'){
                if(input.checked) input.checked = false;
            }else{
                input.value = input.type == 'number' ? 0 : "";
            }
        });
    }    

    static validInput(input){

        if(input.type == 'number' && (isNaN(input.value) || input.value < 0))            
                return false;
        else if(input.type == 'text' && input.value == "")
                return false;        

        return true;
    }    
}