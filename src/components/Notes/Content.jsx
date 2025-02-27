import React, { useContext, useEffect, useState } from "react";
import styles from "./Content.module.css";
import Default from "./Default";
import Notes from "./Notes";
import { NotesContext } from "../../contexts/NotesContext";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const {group} =useContext(NotesContext)
  const navigate =useNavigate()

   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size
  
    // Update screen size on resize
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () =>{ window.removeEventListener("resize", handleResize);
        // navigate('/')
      }
    }, []);

    useEffect(()=>{
      if(isMobile && group==null){
        navigate('/')
      }
    })

  return (
    <div className={styles.contentContainer}>



      {
        group!=null?<Notes/> : <Default/>
      }
      
      
    </div>
  );
};

export default Content;
