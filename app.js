const notes=require('./notes')
const argv = process.argv.slice(2)

if(argv[0]==='add'){    
    const title=argv[1].split('=')[1].replace(/"/g, '');
    const body=argv[2].split('=')[1].replace(/"/g, '');
    notes.addNote(title,body);
}else if (argv[0]==='list') {
    notes.listNote();
}else if (argv[0]==='read') {
    const title=argv[1].split('=')[1].replace(/"/g, '');
    notes.readNote(title);
}else if (argv[0]==='delete') {
    const title=argv[1].split('=')[1].replace(/"/g, '');
    notes.deleteNote(title);
}else{
    console.log("Invalid Command");   
}