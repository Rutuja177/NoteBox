const container = document.getElementById("container")
const input = document.getElementById("input")

const notesDiv = document.createElement('textarea')

const closebtn = document.createElement('button')
closebtn.innerHTML = "close";

const notesContainer = document.createElement('div');
notesContainer.classList.add('noteContainer');
document.body.appendChild(notesContainer);

//to write notes
const addMainDiv = () =>{
    notesDiv.style.cursor = "auto";
    notesDiv.placeholder = "Take a note..."
    notesDiv.style.display = "block";
    notesDiv.style.width = "525px"
    notesDiv.style.height = "50px"
    notesDiv.style.border = "none"
    notesDiv.style.borderRadius = "10px"
    notesDiv.style.backgroundColor = "#FFFFFF";
    notesDiv.style.position = "absolute";
    notesDiv.style.top = `${input.offsetTop + input.offsetHeight}px`;
    notesDiv.style.left = `${input.offsetLeft}px`;
   
    container.appendChild(notesDiv)
    container.appendChild(closebtn)

}
const removeNote = (id) =>{
    let notes = localStorage.getItem('notes');
    if(!notes){
        return;
    }
    notes = JSON.parse(notes);
    const noteIndex = notes.findIndex((note)=> note.id === id)
    
    if (noteIndex !== -1){
        notes.pop(noteIndex);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
// const updateNote = (id) =>{
//     const note = document.getElementById('singleNote')
//     note.classList.add('noteUpdate')
//     console.log(note)
//     console.log("the id for updation", id)
// }
//add note to the body
const addNote = (title = '', text = '',) =>{
    
    const div = document.createElement('div')
    div.id = 'singleNote'
    div.classList.add('noteBlock')

    const noteTitle = document.createElement('h4')
    noteTitle.textContent = title;

    const noteText = document.createElement('p')
    noteText.textContent = text;

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = "delete"

    const updateBtn = document.createElement('button')
    updateBtn.innerHTML = 'update'
    

    div.appendChild(noteTitle)
    div.appendChild(noteText)
    div.appendChild(updateBtn)
    div.appendChild(deleteBtn)
          
    notesContainer.appendChild(div);
        
    if(localStorage){
        let notes = localStorage.getItem('notes')
        if(!notes){
            notes = [];
        }
        else {
            notes = JSON.parse(notes);
        }
        const newNote = {id: Date.now(), title, text}
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes))
        noteTitle.value = newNote.id
        
        
    }
    else{
        console.log("not stored in localStorage")
    }  
    deleteBtn.addEventListener('click', ()=>{
        const noteId = deleteBtn.previousSibling.previousSibling.value
        removeNote(noteId)
        deleteBtn.parentElement.style.display = 'none';
    })
    // updateBtn.addEventListener('click', ()=>{
    //     const noteId = updateBtn.previousSibling.previousSibling.value
    //     updateNote(noteId)

    // }) 
}

input.addEventListener('click', () =>{
    input.placeholder = "Title..."
    
    addMainDiv();
             
})
closebtn.addEventListener('click', () => {
    const title = input.value
    const notes = notesDiv.value
   
    if (notes == ''){
        alert('write something');
    }
    else{
        addNote(title, notes);
    }
    input.value = ''
    notesDiv.value = ''
    notesDiv.style.display = 'none'
    // closebtn.style.display = 'none'
    })
window.addEventListener('load', ()=>{

    const notes = JSON.parse(localStorage.getItem('notes'))
    notes.forEach(note => {
        const div = document.createElement('div')
        div.classList.add('noteBlock')

        const noteTitle = document.createElement('h4')
        noteTitle.textContent = note.title;
        noteTitle.value = note.id

        const noteText = document.createElement('p')
        noteText.textContent = note.text;


        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "delete"

        div.appendChild(noteTitle)
        div.appendChild(noteText)
        div.appendChild(deleteBtn)
        

        notesContainer.appendChild(div);

        deleteBtn.addEventListener('click', ()=>{
            const noteId = deleteBtn.previousSibling.previousSibling.value
            console.log(noteId)
            removeNote(noteId)
            deleteBtn.parentElement.style.display = 'none';
        })
    });  
    
})

