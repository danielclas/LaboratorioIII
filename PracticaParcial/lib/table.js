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
            th.innerText = k;
            thead.appendChild(th);
        });

        table = temp;
    }

    static paintTable(data){

        if(container.children.length > 3){
            container.removeChild(table);
        }

        if(data){
            this.getKeys(data);
        }

        this.emptyTable();
        this.loadTable(data);

        container.appendChild(table);

        table.onclick = this.getSelectedRow;
    }

    static getSelectedRow(e){        
        selectedRow = e.srcElement.parentNode.children[0].innerHTML;
        console.log(e.srcElement.parentNode.children);
        console.log(selectedRow);
        // this.populateForm();
    }

    static populateForm(){

        // let childNode = form.childNodes;
        // let inputs = [];

        // childNodes.forEach( c => {
        //     if(c && c.tagName == "INPUT"){
        //         inputs.push(c);
        //     }
        // });

        
        
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
}