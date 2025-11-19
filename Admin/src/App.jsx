
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './page/Home/Home';
import NavBar from './component/NavBar/NavBar';
import Flash from './page/Flash/Flash';
import Auth from './page/Auth/Auth';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Flash />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
