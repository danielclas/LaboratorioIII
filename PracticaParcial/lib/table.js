import {Request} from './request.js';

const container = document.getElementById('tableContainer');
const keys = [];
let table;
let selectedRow;
let form;

export class Table{

    static emptyTable(){

        let temp = document.createElement('table');
        temp.id = "table";

        let thead = temp.createTHead();
        let tbody = temp.createTBody();

        keys.forEach( k => {
            let th = document.createElement('TH');
            th.innerText = this.normalizeHeader(k);
            thead.appendChild(th);
        });

        table = temp;
    }

    static keys(){
        return keys;
    }

    static selectedId(){
        return selectedRow[0].innerHTML;
    }

    static paintTable(data){

        if(container.children.length > 3){
            container.removeChild(table);
        }

        if(data){
            this.getKeys(data);
        }

        this.emptyTable();
        if(data.data){
            this.loadTable(data);
        }
        
        container.appendChild(table);

        table.onclick = this.getSelectedRow;
    }

    static getSelectedRow(e){        
                
        selectedRow = e.srcElement.parentNode.children;    
        
        if(e.srcElement.parentNode.parentNode.tagName != 'TBODY') return;

        document.getElementById('cancelBtn').style.display = 'inline-block';
        document.getElementById('deleteBtn').style.display = 'inline-block';

        let inputs = document.querySelectorAll('input');

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
    }    

    static getKeys(data){        
        let temp = data.data[0];

        for(let key in temp){
            keys.push(key);
        }
                    
    }

    static loadTable(data){

        let body = table.children[1];

        data.data.forEach( obj => {
            let row = table.insertRow();
            keys.forEach( key => {
                let td = document.createElement('TD');
                td.innerHTML = obj[key];
                row.appendChild(td);
            });            
        });
    }

    static normalizeHeader(text){

        let index = text.indexOf('_');
        let temp = index != -1 ? text.substring(index+1) : text;

        temp = temp[0].toUpperCase() + temp.substring(1);

        return temp;
    }
}