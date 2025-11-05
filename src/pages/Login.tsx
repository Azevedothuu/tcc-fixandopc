import {} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/Fixando-logo.png";


interface LoginForm {
  email: string;
  password: string;
}


function Login() {
  const navigate = useNavigate();
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

  // Simula chamada de API
  const fakeLogin = (data: LoginForm) =>
    new Promise<{ ok: boolean; message?: string }>((resolve) => {
      setTimeout(() => {
        if (data.email === "user@test.com" && data.password === "123456") {
          resolve({ ok: true });
        } else {
          resolve({ ok: false, message: "E-mail e/ou senha inválidas" });
        }
      }, 800);
    });

  const onSubmit = async (data: LoginForm) => {
    const res = await fakeLogin(data);
    if (!res.ok) {
      setError("email", { type: "server", message: res.message });
      return;
    }
    reset();
    navigate("/"); // vai pra home se login ok
  };

  return (
    <div className="h-screen w-full bg-bg text-light flex flex-col items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-[350px]">
        <div className="flex justify-center ">
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
            className={`w-full p-2 border border-gray-300 outline-none rounded-md mb-2 ${
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full bg-orange text-white py-2 rounded-md hover:bg-accent transition disabled:opacity-60"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-gray-500 text-xs mt-3 text-center">
            Não tem uma Conta? <a className="underline" href="/register">Clique Aqui.</a>
          </p>
          <p className="text-gray-500 text-xs mt-3 text-center">
            Teste com: user@test.com / 123456
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login
