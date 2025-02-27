import React, { useContext, useEffect, useState } from "react";
import styles from "./Notes.module.css";
import NoteItem from "./NoteItem";
import { NotesContext } from "../../contexts/NotesContext";

import backBtn from "../../assets/content/back-btn.svg"
import { useNavigate } from "react-router-dom";

const Notes = () => {
  // const [note, setNote] = useState({message:"", createdAt:null});
  const [message, setMessage] = useState("");

  const { notes, updateNotes, group, addNotes } = useContext(NotesContext);
  const navigate = useNavigate(); // For mobile navigation
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => {window.removeEventListener("resize", handleResize)
    
    };
  }, []);


  
  const handleSubmit = () => {
    // console.log("clicked");

    const newNote = {
      message: message,
      createdAt: new Date(),
    };

    // console.log("newnote",newNote);

    addNotes(newNote);

    setMessage("");
  };

  useEffect(() => {
    updateNotes();
  }, [group, notes]);
  return (
    <div className={styles.notesContainer}>
      <div className={styles.header}>
        {isMobile ? (
          <>

           
            <button className={styles.imgBtn} onClick={()=>navigate(-1)}>
              <img src={backBtn} alt="back-btn" />
            </button>
            
            <div className={styles.circleContainer}>
              <div
                className={styles.circle}
                style={{ background: group.color }}
              >
                <h2>{group.nickname}</h2>
              </div>
            </div>
            <div className={styles.title}>
              <h2>{group.title}</h2>
            </div>
          </>
        ) : (
          <>
            <div className={styles.circleContainer}>
              <div
                className={styles.circle}
                style={{ background: group.color }}
              >
                <h2>{group.nickname}</h2>
              </div>
            </div>
            <div className={styles.title}>
              <h2>{group.title}</h2>
            </div>{" "}
          </>
        )}
      </div>
      <div className={styles.content}>
        {notes.length != 0 ? (
          notes.map((note, index) => <NoteItem key={index} note={note} />)
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.messageBox}>
        <div className={styles.innerBox}>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your text here......."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
          ></textarea>
          <div className={styles.btnContainer}>
            <button
              disabled={message.trim().length > 0 ? false : true}
              onClick={handleSubmit}
              className={styles.btn}
            >
              <svg
                width="35"
                height="29"
                viewBox="0 0 35 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
                  fill={message.trim().length > 0 ? "#001F8B" : "#ABABAB"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
