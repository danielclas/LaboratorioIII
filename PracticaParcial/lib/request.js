import {Table} from './table.js';

const route = 'http://localhost:3000/';

export class Request{

    static async ajaxGet(resource){
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  let data = JSON.parse(xhr.responseText);
                  Table.paintTable(data);         
              }
          }  
        }

        xhr.open('GET', route + resource);
        xhr.send();

    }

    static ajaxPost(body){

    }

    static fetchGet(){

    }

    static fetchPost(body){

    }
}