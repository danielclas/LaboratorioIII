import {Table} from './table.js';
import { Notify } from './notify.js';

let form = document.getElementById('form');

export class Form{

    static formToObject(){

        let obj = {};
        let inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            let value;

            if(input.type == 'radio'){
                if(input.checked){
                    value = input.value;
                    if(obj) obj[input.name] = input.value;
                }
            }else{
                if(!this.isValidInput(input)) obj = undefined;                    
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

        Notify.showEditButtons(false);
    }    

    static isValidInput(input){

        if(input.type == 'number' && (isNaN(input.value) || input.value < 0 || input.value == ""))            
                return false;
        else if(input.type == 'text' && input.value == "")
                return false;        

        return true;
    }    

    static populateForm(selectedRow){

        let inputs = document.querySelectorAll('input');
        let keys = Table.keys();

        inputs.forEach( input => {
            let index = keys.indexOf(input.name);
            let value = selectedRow[index].innerHTML;

            if(input.type=='radio'){
                if(input.value == value) input.checked = true;;
            }else{
                if(value[0]=='$'){
                    let temp = "";                    
                    for(let i = 0 ; i<value.length ; i++){
                        if(!isNaN(value[i])) temp+=value[i];
                    }    
                    value = parseInt(temp);
                }
                input.value = value;
            }            
        });        

        Notify.showEditButtons(true);
        Notify.invalidForm(false);
    }
}