import styles from './App.module.css'
import Sidebar from './components/Sidebar/Sidebar'
import Content from './components/Notes/Content'
function App() {
  
  return (
    <div className={styles.container}>
     <Sidebar/>
     <Content/>
    </div>
  )
}

export default App
