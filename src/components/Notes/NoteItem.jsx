import React from "react";
import styles from "./NoteItem.module.css";
const NoteItem = ({ note }) => {
  const formatDateAndTime = () => {
    const date = note.createdAt ? new Date(note.createdAt) : null;
    const formattedDate = date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Unknown Date"; 


      const formattedTime = date
  ? date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, 
    })
  : "Invalid Time";

        return [formattedDate,formattedTime]
    // console.log(note.createdAt, formattedDate);
  };

  

  return (
    <div className={styles.container}>
      <p>{note.message}</p>

      <div className={styles.footer}>
        <span>
          {formatDateAndTime()[0]}
        </span>
        <span style={{ fontSize: "1rem" }}>&bull;</span>
        <span>
          {
            formatDateAndTime()[1]
          }
        </span>
      </div>
    </div>
  );
};

export default NoteItem;
