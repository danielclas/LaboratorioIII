import {DAO} from './lib/dao.js';
import {Table} from './lib/table.js';
import {Form} from './lib/form.js';
import {Notify} from './lib/notify.js';
import {Filter} from './lib/filter.js';

DAO.initLocalStorage();
DAO.getFromLocalStorage();
// DAO.getFromServer();

let form = document.getElementById('form');
let filterForm = document.getElementById('filterForm');
let saveBtn = document.getElementById('saveBtn');
let deleteBtn = document.getElementById('deleteBtn');
let cancelBtn = document.getElementById('cancelBtn');
let filterBtn = document.getElementById('btnFiltrar');

//Cambiar a save/delete from localStorage de ser necesario
saveBtn.onclick = DAO.saveToLocalStorage;
deleteBtn.onclick = DAO.deleteFromLocalStorage;
// saveBtn.onclick = DAO.saveToServer;
// deleteBtn.onclick = DAO.deleteFromServer;
cancelBtn.onclick = cancelEdit;


deleteBtn.style.display = 'none';
cancelBtn.style.display = 'none';

filterBtn.onclick = Filter.applyFilters;
filterBtn.disabled = true;

form.onsubmit = (e) => e.preventDefault();
form.oninput = () => {    
    Notify.invalidForm(false);
}
filterForm.onchange = () => filterBtn.disabled = false;

function cancelEdit(){
    Form.cleanForm();
    Table.unselectRow();
    Notify.invalidForm(false);
    Notify.showEditButtons(false);
}