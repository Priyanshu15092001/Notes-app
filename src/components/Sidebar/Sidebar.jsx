import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import addBtn from "../../assets/sidebar/add-btn.png";
import ListItem from "./ListItem";
import Modal from "./Modal";
import { NotesContext } from "../../contexts/NotesContext";
import { useContext } from "react";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [storedData, setStoredData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const {group,updateGroup}=useContext(NotesContext)

  const updateModal = (flag) => {
    setIsOpen(flag);
  };

  // Function to load all data from localStorage
  const loadData = () => {
    const dataArray = [];

    // Iterate over all keys in localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key !== "lastId") {
        const item = JSON.parse(localStorage.getItem(key)); // Parse JSON
        dataArray.push(item);
      }
    });

    dataArray.sort((a, b) => a.id - b.id);
    setStoredData(dataArray); // Update state
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [renderComponent]);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>
        <h1>Pocket Notes</h1>
      </div>
      <div className={styles.list}>
        {storedData.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              isSelected={group!=null?group.id === item.id:false}
              onClick={() => updateGroup(item)}
            />
          );
        })}
      </div>

      <img
        src={addBtn}
        alt=""
        className={styles.addBtn}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <Modal
          updateModal={updateModal}
          isOpen={isOpen}
          renderComponent={renderComponent}
          setRenderComponent={setRenderComponent}
        />
      )}
    </div>
  );
};

export default Sidebar;
