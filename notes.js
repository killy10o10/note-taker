// ===Global Query Selectors=== //
const noteContainer = document.querySelector('.note-container');
const modalContainer = document.querySelector('.modal-container');
const form= document.querySelector('form');
const titleInput = document.querySelector('#title');

// ===  Class for creating new Note===(1st) //
class Note {
    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id = Math.random()
    }
}

// Local STORAGE
// Retrive notes from Local Storage (8th)
function getNotes() {
    let notes; 
    if(localStorage.getItem('notesCollection') === null) {
        notes = [];
    }
    else {
      notes = JSON.parse(localStorage.getItem('notesCollection'));  
    }

    return notes;
}

// Function to Add note to local Storage (9th)
function addNoteToLocalStorage(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('notesCollection', JSON.stringify(notes));
}

// Function to Remove note from Local Storage (12th)
function removeNote(id) {
    const notes = getNotes();
    notes.forEach((note, index) => {
        if(note.id === id ) {
            notes.splice(index, 1);
        }
        localStorage.setItem('notesCollection', JSON.stringify(notes));
    })
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

// Function to show Notes in UI (10th)
function displayNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        addNoteToList(note);
    });
}

// Event for Displaying Notes (11th)
document.addEventListener('DOMContentLoaded', displayNotes);

// === Function to show alert (7th) === //
function showAlertMessage(message, alertClass) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message)); //(7th)
    form.insertAdjacentElement('beforebegin', alertDiv);
    titleInput.focus();
    setTimeout(() => alertDiv.remove(), 2000);
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
const modalBtn = document.querySelector('.modal-btn').addEventListener('click', () =>{
    modalContainer.classList.remove('active');
}); 

// === Add event to Note Buttons (4th) === //
noteContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('view-note')) {
        const currenNote = e.target.closest('.note');
        const currentTitle = currenNote.querySelector('.note-title').textContent;
        const currentBody = currenNote.querySelector('.note-body').textContent;
        activateNoteModal(currentTitle, currentBody);
    }

    if (e.target.classList.contains('delete-note')) {
        const currenNote = e.target.closest('.note');
        showAlertMessage('Your note was permanently deleted!', 'remove-message');  // (7th)
        currenNote.remove();
        const id = currenNote.querySelector('span').textContent; //(12th)
        removeNote(Number(id)); //(12th)
    }
})

// === Event for submitting a new Form (Note)=== (2nd) //
form.addEventListener('submit', (e) => {
    e.preventDefault();
   
    const noteInput = document.querySelector('#note');

    //validate inputs
    if(titleInput.value.length > 0 && noteInput.value.length > 0 ) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        addNoteToLocalStorage(newNote) //(9th)
        titleInput.value = '';
        noteInput.value = '';
        showAlertMessage('Note successfully added.', 'success-message');  // (7th)
        titleInput.focus();
    }
    
    else {
        showAlertMessage('Please add both a title and a note!', 'alert-message');  // (7th)
    }
} )