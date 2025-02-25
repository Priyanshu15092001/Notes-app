import React, { useState } from "react";
import styles from "./Modal.module.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];
const Modal = ({ isOpen, updateModal, renderComponent, setRenderComponent }) => {
  

  const getLastId = () => Number(localStorage.getItem("lastId")) || 1;

  const [formData, setFormData] = useState({id:getLastId(), title: "",nickname:"", color: null, contents:[]});


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newId = formData.id + 1;

    const newGroup=addGroup()

    // Store the new object in localStorage (using unique key)
    localStorage.setItem(formData.id, JSON.stringify(newGroup));

    // Update last stored ID in localStorage
    localStorage.setItem("lastId", newId);


    setFormData({ id: newId, title: "", nickname: "", color: null, contents: []});
   
    updateModal(false)
    setRenderComponent(!renderComponent)
  };

  const getInitials = (sentence) => {
    // Trim and split the sentence into words
    let words = sentence.trim().split(/\s+/);

    // If the sentence has only one word, return its first letter
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    // Otherwise, return initials of the first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const addGroup = () => {

    
    // console.log(formData);
    
    const newGroup = {
      ...formData,
      id: formData.id,
      nickname: getInitials(formData.title),
      contents: [],
    };

     return newGroup
    
  };
  return (
    <div className={styles.modalOverlay} onClick={() => updateModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Create New group</h2>
        <form action="" className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="grp-name">Group Name</label>
            <input
              type="text"
              id="grp-name"
              placeholder="Enter group name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="color-option">Choose color</label>
            <div className={styles.colorOptions} id="color-option">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.colorCircle} ${
                    formData.color === color ? styles.selected : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color: color })}
                ></div>
              ))}
            </div>
          </div>

          <button
            className={styles.createBtn}
            disabled={formData.title.trim().length>0 && formData.color!=null?false:true}
            onClick={handleSubmit}
            style={{ backgroundColor: formData.title.trim().length>0 && formData.color!=null? "#001F8B" : "#ABABAB" }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
