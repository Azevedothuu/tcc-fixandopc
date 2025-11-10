import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Button from "../ui/Button";

export default function Development() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg text-white text-center">
      <FaExclamationTriangle className="text-6xl text-orange mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg mb-6">Oops... Essa página está em desenvolvimento, tente novamente mais tarde.</p>
      <Button
        onClick={() => navigate("/")}
      >
        Voltar pra Home
      </Button>
    </div>
  );
}
