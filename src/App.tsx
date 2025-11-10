import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // importa o contexto
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Login */}
          <Route path="/register" element={<Register />} /> {/* Register */}
          <Route path="/" element={<Home />} /> {/* Inicial */}
          <Route path="/AboutUs" element={<AboutUs />} /> {/* Sobre Nós */}


          <Route path="*" element={<NotFound />} /> {/* 404 NotFound */}
          



          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
