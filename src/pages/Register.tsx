import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // usa o contexto global de auth
import Icon from "../assets/Fixando-logo.png";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { login } = useUser(); // pega a função login do contexto

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<RegisterForm>({
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Simulação de API — depois tu troca pelo fetch real
  const fakeRegister = async (data: RegisterForm) => {
    return new Promise<{ ok: boolean; message?: string }>((resolve) => {
      setTimeout(() => {
        if (data.email === "jaexiste@test.com") {
          resolve({ ok: false, message: "Email já cadastrado" });
        } else {
          // simula salvar user no "banco"
          localStorage.setItem(
            "user",
            JSON.stringify({ username: data.username, email: data.email })
          );
          resolve({ ok: true });
        }
      }, 1000);
    });
  };

  const onSubmit = async (data: RegisterForm) => {
    const res = await fakeRegister(data);
    if (!res.ok) {
      setError("email", { type: "server", message: res.message });
      return;
    }

    // salva usuário no contexto (login automático)
    login(data.username);

    reset();
    navigate("/"); // depois do registro, vai direto pra home
  };

  return (
    <div className="h-screen w-full bg-bg text-light flex flex-col items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-[350px]">
        <div className="flex justify-center mb-6">
          <img className="w-32" src={Icon} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Nome de usuário */}
          <label className="block text-sm font-medium mb-1">Nome de usuário</label>
          <input
            type="text"
            {...register("username", {
              required: "Nome de usuário é obrigatório",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
            className={`w-full p-2 border outline-none rounded-md mb-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-3">{errors.username.message}</p>
          )}

          {/* Email */}
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

          {/* Senha */}
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
            <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-orange text-white py-2 rounded-md hover:bg-accent transition disabled:opacity-60"
          >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>

          <p className="text-gray-500 text-xs mt-3 text-center">
            Já tem uma conta?{" "}
            <a className="underline" href="/login">
              Fazer Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
