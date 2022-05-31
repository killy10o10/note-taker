// ===Global Query Selectors=== //
const noteContainer = document.querySelector('.note-container');
const modalContainer = document.querySelector('.modal-container');
const form= document.querySelector('form');

// ===  Class for creating new Note===(1st) //
class Note {
    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id = Math.random()
    }
}

// UI Updates 
// === Function to create new Note in UI (3rd)=== //
function addNoteToList (note) {
     const newNoteToUI = document.createElement('div');
     newNoteToUI.classList.add('note');
     newNoteToUI.innerHTML = `
     <span hidden>${note.id}</span>
     <h2 class="note-title">${note.title}</h2>
     <p class="note-body">${note.body}</p>
     <div class="note-btns">
         <button type="button" class="note-btn view-note">View Note</button>
         <button type="button" class="note-btn delete-note">Delete Note</button>
     </div>`;
     noteContainer.appendChild(newNoteToUI);
}

// === Function to view Note in modal (5th) === //
function activateNoteModal (title, body)  {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalContainer.classList.add('active');
}

// Close modal (6th)


// === Add event to Note Buttons (4th) === //
noteContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('view-note')) {
        const currenNote = e.target.closest('.note');
        const currentTitle = currenNote.querySelector('.note-title').textContent;
        const currentBody = currenNote.querySelector('.note-body').textContent;
        activateNoteModal(currentTitle, currentBody);
    }
})

// === Event for submitting a new Form (Note)=== (2nd) //
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.querySelector('#title');
    const noteInput = document.querySelector('#note');

    //validate inputs
    if(titleInput.value.length > 0 && noteInput.value.length > 0 ) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        titleInput.value = '';
        noteInput.value = '';
        titleInput.focus();
    }
} )