import Icon from "../assets/Fixando-logo.png";
import { useNavigate } from "react-router-dom";


interface BaseLayoutProps {
  children: React.ReactNode;
}


  

function BaseLayout({ children }: BaseLayoutProps) {

  const navigate = useNavigate(); // hook do react-router-dom
  return (
    <div className="flex flex-col min-h-screen bg-bg text-white">
      {/* HEADER */}
      <header className="bg-bg p-2 flex items-center justify-between shadow-md">
        <img className="w-[90px]" src={Icon} />

        <button
          className="cursor-pointer w-[100px] bg-orange text-white py-2 rounded-md hover:bg-accent transition disabled:opacity-60"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 bg-white p-6">{children}</main>

      {/* FOOTER */}
      <footer className="bg-bg p-4 text-center text-sm shadow-inner">
        <p>© {new Date().getFullYear()} Fixando. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default BaseLayout
