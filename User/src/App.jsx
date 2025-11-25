import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home/Home";
import Flash from "./Page/Flash/Flash";
import Auth from "./Page/Auth/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Flash/>} />
      <Route path="/home" element={< Home/>} />
      <Route path="/auth" element={< Auth/>} />
    </Routes>
  );
}

export default App;
