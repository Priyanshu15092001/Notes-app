import styles from './App.module.css'
import Sidebar from './components/Sidebar/Sidebar'
import Content from './components/Notes/Content'
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    // console.log(isMobile,handleResize());
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className={styles.container}>
        {isMobile ? (
          <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route path="/content" element={<Content />} />
          </Routes>
        ) : (
          <>
            <Sidebar />
            <Content />
          </>
        )}
      </div>
    </Router>
  );
};

export default App
