import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import Icon from "../assets/Fixando-logo.png";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();

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

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);
      reset();
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        setError("email", {
          type: "server",
          message: err.response.data.message,
        });
      } else {
        alert("Erro ao registrar. Tenta novamente mais tarde.");
      }
    }
  };

  return (
    <div className="h-screen w-full bg-bg flex flex-col items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-[350px]">
        <div className="flex justify-center mb-4">
          <img className="w-32" src={Icon} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Username */}
          <label className="block text-sm font-medium mb-1">Nome de usuário</label>
          <input
            type="text"
            {...register("username", { required: "Nome de usuário é obrigatório" })}
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

          {/* Password */}
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" },
            })}
            className={`w-full p-2 border outline-none rounded-md mb-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full bg-orange text-white py-2 rounded-md hover:bg-accent transition disabled:opacity-60"
          >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
