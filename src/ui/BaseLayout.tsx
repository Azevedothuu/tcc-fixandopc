import Icon from '../assets/Fixando-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import Button from './Button';
import { useUser } from '../context/UserContext';

interface BaseLayoutProps {
  children: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-white relative">
      {/* HEADER */}
      <header className="bg-bg p-2 flex items-center justify-between shadow-md relative">
        <img className="w-[90px]" src={Icon} alt="Logo" />

        

        <div className="flex items-center space-x-5">
          {user ? (
            /*        se usuário logado           */
            <div
              className="flex items-center space-x-2 cursor-pointer relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-2xl" />
              <span>{user}</span> 
              {dropdownOpen && (
                <div className="absolute top-full p-4 bg-white transition-transform ease-in-out right-0 mt-2 w-40 text-black rounded shadow-lg py-4 z-50">
                  <Button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full px-4 py-2 text-lg hover:bg-gray-100"
                    variant="danger"
                  >
                    Sair
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // não logado → botão login
            <Button onClick={() => navigate('/login')} variant="primary">
              Login
            </Button>
          )}

          {/* botão sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 cursor-pointer focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white shadow-lg p-4 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <ul className="space-y-2">
          <li>
            <Button
              variant="outline"
              className="block hover:bg-gray-700 p-2 w-full rounded transition-colors duration-200"
              onClick={() => {
                navigate('/'); // fazer um window
              }}
            >
              Comunidade
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className="block hover:bg-gray-700 p-2 w-full rounded transition-colors duration-200"
              onClick={() => {
                navigate('$'); // fazer um window
              }}
            >
              Perfil
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className="block hover:bg-gray-700 p-2 w-full rounded transition-colors duration-200"
              onClick={() => {
                navigate('/Learn'); 
              }}
            >
              Aprenda IMC
            </Button>
            </li>
            <li>
            <Button
              variant="outline"
              className="block hover:bg-gray-700 p-2 w-full rounded transition-colors duration-200"
              onClick={() => {
                navigate('/AboutUs'); // rota
              }}
            >
              Sobre Nós
            </Button>
            </li>
            
            <li>
            <Button
              onClick={() => setSidebarOpen(false)}
              className="mt-4 cursor-pointer"
              variant="danger"
            >
              Fechar
            </Button>
          </li>
        </ul>
      </div>

      {/* Overlay sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0  bg-opacity-50 z-40 transition-opacity duration-300"
        />
      )}

      {/* CONTEÚDO */}
      <main className="flex-1 bg-white p-6">{children}</main>

      {/* FOOTER */}
      <footer className="bg-bg p-4 text-center text-sm shadow-inner">
        <p>© {new Date().getFullYear()} Fixando. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default BaseLayout;
