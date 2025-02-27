import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import for mobile navigation
import styles from "./Sidebar.module.css";
import addBtn from "../../assets/sidebar/add-btn.png";
import ListItem from "./ListItem";
import Modal from "./Modal";
import { NotesContext } from "../../contexts/NotesContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [storedData, setStoredData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(true);
  const { group, updateGroup } = useContext(NotesContext);
  const navigate = useNavigate(); // For mobile navigation
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateModal = (flag) => {
    setIsOpen(flag);
  };

  // Function to load all data from localStorage
  const loadData = () => {
    const dataArray = [];
    Object.keys(localStorage).forEach((key) => {
      if (key !== "lastId") {
        const item = JSON.parse(localStorage.getItem(key));
        dataArray.push(item);
      }
    });

    dataArray.sort((a, b) => a.id - b.id);
    setStoredData(dataArray);
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [renderComponent]);

  // Handle item selection based on screen size
  const handleItemClick = (item) => {
    updateGroup(item);
    if (isMobile) navigate("/content"); // Navigate on mobile
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>
        <h1>Pocket Notes</h1>
      </div>
      <div className={styles.list}>
        {storedData.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            isSelected={group ? group.id === item.id : false}
            onClick={() => handleItemClick(item)}
          />
        ))}
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
