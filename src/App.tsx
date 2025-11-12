import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // importa o contexto
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Learn from "./pages/Learn";
import Development from "./pages/Development";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Login */}
          <Route path="/register" element={<Register />} /> {/* Register */}


          <Route path="/" element={<Home />} /> {/* Inicial */}
          <Route path="/AboutUs" element={<AboutUs />} /> {/* Sobre Nós */}
          <Route path="/Learn" element={<Learn />} /> {/* Estudos */}



          <Route path="*" element={<NotFound />} /> {/* 404 NotFound */}
          <Route path="$" element={<Development />} /> {/* Development */}
          



          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
