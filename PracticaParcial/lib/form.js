import {Table} from './table.js';

let form = document.getElementById('form');
let keys = Table.keys();

export class Form{

    static formToJson(){

        let obj = {};
        let inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            let value;
            let index = keys.indexOf(input.name);

            if(input.type == 'radio'){
                if(input.checked){
                    value = input.value;
                    obj[input.name] = input.value;
                }
            }else{
                obj[input.name] = input.value;
            }               
        });

        return JSON.stringify(obj);
    }
    
    
}