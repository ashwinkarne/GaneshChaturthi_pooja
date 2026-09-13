import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Userinput from './User_input'
import Welcome from "./welcome";
import Home from "./Home";  
import Visitors from "./Visitors";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Userinput />} />
            <Route path="/welcome" element={<Welcome />} />\
            <Route path="/home" element={<Home />} />
            <Route path="/visitors" element={<Visitors />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
