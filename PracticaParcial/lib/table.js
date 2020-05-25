import {Request} from './request.js';
import { Notify } from './notify.js';
import { Form } from './form.js';

const container = document.getElementById('tableContainer');
const keys = [];
let table;
let selectedRow;

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

        return temp
    }

    static keys(){
        return keys;
    }

    static selectedId(){
        return selectedRow[0].innerHTML;
    }

    static paintTable(data){

        if(data) this.getKeys(data);
        
        let temp = this.emptyTable();

        if(data.data) temp = this.loadTable(data,temp);            
        
        if(container.children.length > 3) document.querySelector('#table') = temp; 
        else container.appendChild(temp);
        
        table = temp;
        table.onclick = this.getSelectedRow;
    }

    static getSelectedRow(e){        
        
        let s = document.getElementsByClassName('selected');
        if(s[0]) s[0].classList.remove('selected');

        if(selectedRow==e.srcElement.parentNode.children){
            selectedRow = undefined;
            Form.cleanForm();
            return;
        }

        selectedRow = e.srcElement.parentNode.children;    
        
        if(e.srcElement.parentNode.parentNode.tagName != 'TBODY') return;

        e.srcElement.parentNode.classList.add('selected');

        Form.populateForm(selectedRow);
    }    

    static getKeys(data){        
        let temp = data.data[0];

        for(let key in temp)
            keys.push(key);                     
    }

    static loadTable(data, temp){

        data.data.forEach( obj => {
            let row = temp.insertRow();
            keys.forEach( key => {
                let td = document.createElement('TD');
                td.innerHTML = obj[key];
                row.appendChild(td);
            });            
        });        

        return temp;
    }

    static normalizeHeader(text){

        let index = text.indexOf('_');
        let temp = index != -1 ? text.substring(index+1) : text;

        temp = temp[0].toUpperCase() + temp.substring(1);

        return temp;
    }
}