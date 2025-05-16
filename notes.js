const fs=require('fs').promises;
const path=require('path');
const notesFile=path.join(__dirname,'data','notes.json')
  
const loadNotes = async () => {
    try {
        const dataBuffer = await fs.readFile(notesFile);  
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];  
    }
};

const saveNotes = async (notes) => {
    const dataJSON = JSON.stringify(notes);  
    try {
        await fs.writeFile(notesFile, dataJSON);  
        console.log('Notes saved successfully!');
    } catch (error) {
        console.log(error);
    }
};

const addNote = async (title, body) => {
    const notes = await loadNotes();  
    const duplicateNote = notes.find((note) => note.title === title);
    !duplicateNote
       ? (notes.push({ title, body }), await saveNotes(notes), console.log("New note added!"))
       : console.log('Note Title Taken!');
};

const listNote = async () => {
    const notes = await loadNotes();  
    console.log('Your Notes:');
    notes.forEach((note) => {
        console.log("Title:",note.title);  
    });
};


const readNote = async (title) => {
    const notes = await loadNotes();  
    const note = notes.find((note) => note.title === title);  
   note 
     ? (console.log(`Title: ${note.title}`), console.log(`Body: ${note.body}`))
     : console.log("Note not found!");
};


const deleteNote = async (title) => {
    let notes = await loadNotes();  
    const notesTohave = notes.filter((note) => note.title !== title);  
    
    notes.length > notesTohave.length
       ? (notes = notesTohave, await saveNotes(notes), console.log("Note Removed!"))
       : console.log("No note found!");
};



module.exports={
    addNote,
    listNote,
    readNote,
    deleteNote,
    loadNotes,
    saveNotes
};