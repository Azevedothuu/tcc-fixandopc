import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // importa o contexto
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Login */}
          <Route path="/register" element={<Register />} /> {/* Register */}
          <Route path="/" element={<Home />} /> {/* Inicial */}
          



          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
