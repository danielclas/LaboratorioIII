import {Request} from './lib/request.js';
import {Table} from './lib/table.js';
import {Form} from './lib/form.js';
import {Notify} from './lib/notify.js';

Request.ajaxGet('traer');

let form = document.getElementById('form');
let saveBtn = document.getElementById('saveBtn');
let deleteBtn = document.getElementById('deleteBtn');
let cancelBtn = document.getElementById('cancelBtn');

saveBtn.onclick = saveToServer;
deleteBtn.onclick = deleteEntry;
cancelBtn.onclick = cancelEdit;

deleteBtn.style.display = 'none';
cancelBtn.style.display = 'none';

form.onsubmit = (e) => e.preventDefault();

function saveToServer(){

    let obj = Form.formToObject();

    if(!obj){
        Notify.invalidForm();
        console.log("obj undefined"+obj);
    }else{
        let json = JSON.stringify(obj);
        let resource = obj.id == "" ? 'alta' : 'modificar';
        Request.ajaxPost(json, resource, 'application/json');
    }      
}

function deleteEntry(){

    let id = parseInt(Table.selectedId());
    let obj = "id="+id;
    console.log(obj);

    Request.ajaxPost(obj, 'baja', 'application/x-www-form-urlencoded');
}

function cancelEdit(){

    deleteBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    Form.cleanForm();
}