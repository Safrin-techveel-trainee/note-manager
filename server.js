const express=require('express');
const app=express();
const notes=require('./notes')

app.use(express.json());


app.get('/notes',async (req,res)=>{
    try {
        const notesList=await notes.loadNotes()
        res.json(notesList)
    } catch (error) {
        res.status(500).end('Something Went Wrong')
    }
});

app.get('/notes/:title',async(req,res)=>{
    try {
        const {title}=req.params;
        const note = await notes.readNote(title)
        res.json(note)
    } catch (error) {
         res.status(500).end('Something Went Wrong')
    }
});

app.post('/notes',async(req,res)=>{
    try {
        const { title, body } = req.body;
        const note=await notes.addNote(title,body);
        res.json({ message: 'New note added' });
    } catch (error) {
        res.status(500).end('Something Went Wrong')
    }
});

app.delete('/notes/:title',async(req,res)=>{
    try {
        const title=req.params.title;
        await notes.deleteNote(title)
        res.json({ message: 'Note Removed!' });
    } catch (error) {
         res.status(500).end('Something Went Wrong')
    }
});

app.all('*',(req,res)=>{
     res.status(404).end('404 not found')
 })
 
app.listen(3000,()=>{
    console.log('Server is up on port 3000!');
})
