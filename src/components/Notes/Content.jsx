import React, { useContext } from "react";
import styles from "./Content.module.css";
import Default from "./Default";
import Notes from "./Notes";
import { NotesContext } from "../../contexts/NotesContext";

const Content = () => {
  const {group} =useContext(NotesContext)
  
  return (
    <div className={styles.contentContainer}>
      {
        group!=null?<Notes/> : <Default/>
      }
      
      
    </div>
  );
};

export default Content;
