import { createContext, useState } from "react";

export const NotesContext=createContext()

export const NotesProvider =({children})=>{
    const[notes, setNotes]=useState([])
    const[group, setGroup] =useState(null)

    const updateGroup=(item)=>{
        setGroup(item)
        console.log(group);
        
        // updateNotes()
    }

    const updateNotes=()=>{
        if(group!=null){
            console.log(group);
            
            setNotes(group.contents)
        }
        console.log(notes);
        
    }
    const addNotes=(newNote)=>{
        
        notes.push(newNote)
        
        const updateGroup={
            ...group,
            contents: notes
        }

        console.log("notes", notes);
        
        console.log("group",updateGroup);
        
        localStorage.setItem(updateGroup.id,JSON.stringify(updateGroup))
    }
   



    return (
        <NotesContext.Provider value={{group,updateGroup,notes,updateNotes,addNotes}}>
            {children}
        </NotesContext.Provider>
    )
}