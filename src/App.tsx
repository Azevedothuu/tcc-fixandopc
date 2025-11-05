import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Login  */}
        <Route path="/register" element={<Register />} /> {/* Register  */}
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
