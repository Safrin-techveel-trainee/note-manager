const fs=require('fs').promises;
const path=require('path');
// const { title } = require('process');
const notesFile=path.join(__dirname,'data','notes.json')
  

const loadNotes = async () => {
    try {
        const dataBuffer = await fs.readFile(notesFile);  
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];  
    }
};

const saveNotes = async (notes) => {
    const dataJSON = JSON.stringify(notes);  

    try {
        await fs.writeFile(notesFile, dataJSON);  
        console.log('Notes saved successfully!');
    } catch (e) {
        console.error('Error saving notes:', err);  
    }
};

const addNote = async (title, body) => {
    const notes = await loadNotes();  
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        await saveNotes(notes);  
        console.log("New note added!");
    } else {
        console.log('Note Title Taken!');
    }
};

const listNote = async () => {
    const notes = await loadNotes();  
    console.log('Your Notes:');
    notes.forEach((note) => {
        console.log(note.title);  
    });
};


const readNote = async (title) => {
    const notes = await loadNotes();  
    const note = notes.find((note) => note.title === title);  

    if (note) {
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log("Note not found!");
    }
};


const deleteNote = async (title) => {
    let notes = await loadNotes();  
    const notesToKeep = notes.filter((note) => note.title !== title);  

    if (notes.length > notesToKeep.length) {  
        notes = notesToKeep;  
        await saveNotes(notes);  
        console.log("Note Removed!");
    } else {
        console.log("No note found!");
    }
};

module.export={
    addNote,
    listNote,
    readNote,
    deleteNote
};