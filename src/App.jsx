import Home from './Home.jsx'
import './App.css'
import Tasks from './Tasks.jsx'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { Router } from 'react-router-dom'

function App() {
  

  return (
    <>
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path='/tasks' element={<Tasks/>}></Route>
     </Routes>
   
    </BrowserRouter>
    
    </>
  )
}

export default App
