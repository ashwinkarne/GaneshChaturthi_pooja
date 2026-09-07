import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Userinput from './User_input'
import Welcome from "./welcome";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Userinput />} />
            <Route path="/welcome" element={<Welcome />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
