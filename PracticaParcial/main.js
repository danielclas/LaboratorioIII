import {Request} from './lib/request.js';
import {Table} from './lib/table.js';

Request.ajaxGet("traer");

let form = document.getElementById('form');
Table.form = form;
form.onsubmit = (e) => e.preventDefault();