
export class Notify{
    
    static showSpinner(show){

        
    }    

    static invalidForm(show){        

        let p = document.getElementById('errorMsg');
        p.style.display= show ? 'block' : 'none';
    }

    static showEditButtons(show){       

        document.getElementById('cancelBtn').style.display = show ? 'inline-block' : 'none';
        document.getElementById('deleteBtn').style.display = show ? 'inline-block' : 'none';
    }
}