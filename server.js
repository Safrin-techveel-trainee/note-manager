const express=require('express');
const app=express();
const notes=require('./notes')

app.use(express.json());
app.all('*',(req,res)=>{
     res.status(404).end('404 not found')
 })

app.get('/notes',async (req,res)=>{
    try {
        const notesList=await notes.loadNotes()
        res.json(notesList)
    } catch (error) {
        res.status(500).end('Something Went Wrong')
    }
})

app.get('/notes/:title',async(req,res)=>{
    try {
        const title=req.params.title;
        const noteList=await notes.loadNotes();
        const note=noteList.find((note)=>note.title===title)
        res.json(note)
    } catch (e) {
         res.status(500).end('Something Went Wrong')
    }
})

app.post('/notes',async(req,res)=>{
    try {
        const title=req.params.title;
        const body=req.body.body;
        const note=await notes.addNote(title,body);
        res.json(note)
         res.json({ message: 'New note added' });
    } catch (error) {
        res.status(500).end('Something Went Wrong')
    }
});

app.delete('/notes/:title',async(req,res)=>{
    try {
        const title=req.params.title;
        const note=await notes.deleteNote(title)
        res.json(note)
         res.json({ message: 'Note Removed!' });
    } catch (e) {
         res.status(500).end('Something Went Wrong')
    }
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000!');
    
})