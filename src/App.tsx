import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />  {/* Página inicial */}
        <Route path="/login" element={<Login />} /> {/* Login como rota */}
        <Route path="/register" element={<Register />} /> {/* Register como rota */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
