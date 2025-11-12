import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/Fixando-logo.png";
import Button from "../ui/Button";
import { useUser } from "../context/UserContext";
import { loginUser } from "../api/api"; // importa da tua API

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LoginForm>({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      // Chama tua API real
      const res = await loginUser(data.email, data.password);

      // Pega o nome do usuário (ou usa "Usuário" se não tiver)
      const userName = res?.user?.username || data.email.split("@")[0] || "Usuário";

      // Atualiza o contexto global
      login(userName);

      // Limpa o form
      reset();

      // Redireciona pra home
      navigate("/home");
    } catch (err: any) {
      console.error("Erro no login:", err);
      if (err.response?.data?.message) {
        setError("email", { type: "server", message: err.response.data.message });
      } else {
        alert("Erro ao fazer login. Tenta novamente.");
      }
    }
  };

  return (
    <div className="h-screen w-full bg-bg text-light flex flex-col items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-[350px]">
        <div className="flex justify-center mb-4">
          <img className="w-32" src={Icon} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* EMAIL */}
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
            className={`w-full p-2 border outline-none rounded-md mb-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="exemplo@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
          )}

          {/* SENHA */}
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            className={`w-full p-2 border outline-none rounded-md mb-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="w-full"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          <p className="text-gray-500 text-xs mt-3 text-center">
            Não tem uma conta?{" "}
            <a className="underline" href="/register">
              Clique aqui.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
