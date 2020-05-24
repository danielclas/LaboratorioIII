import {Request} from './lib/request.js';
import {Table} from './lib/table.js';
import {Form} from './lib/form.js';

Request.ajaxGet('traer');

let form = document.getElementById('form');
form.onsubmit = (e) => e.preventDefault();

let btnGuardar = document.getElementById('btnGuardar');
let btnEliminar = document.getElementById('btnEliminar');

btnGuardar.onclick = saveToServer;
btnEliminar.onclick = deleteEntry;

function saveToServer(){
    let obj = Form.formToJson();
    Request.ajaxPost(obj, 'modificar', 'application/json');
}

function deleteEntry(){

    let id = Table.selectedId();
    let obj = {id:id};

    console.log(JSON.stringify(obj));
    // Request.ajaxPost(JSON.stringify(obj), 'baja', 'application/x-www-form-urlencoded');
}