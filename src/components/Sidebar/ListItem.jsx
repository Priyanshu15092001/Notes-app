import React, { useState } from "react";
import styles from "./ListItem.module.css";
import { useRef } from "react";
const ListItem = ({ item , isSelected, onClick }) => {
  
  return (
    <div
    className={`${styles.itemContainer} ${isSelected ? styles.highlight : ""}`}
      
    // tabIndex={0} // Allows the div to receive focus
    onClick={onClick}
    >
      <div className={styles.circleContainer}>
        <div className={styles.circle} style={{ backgroundColor: item.color }}>
          <h3>{item.nickname}</h3>
        </div>
      </div>
      <div className={styles.title}>
        <h2>{item.title}</h2>
      </div>
    </div>
  );
};

export default ListItem;
