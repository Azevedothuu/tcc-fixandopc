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
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

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
        alert("Erro ao registrar. Tenta novamente.");
      }
    }
  };

  return (
    <div className="h-screen w-full bg-bg flex flex-col items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-md w-[350px]">
        <div className="flex justify-center mb-4">
          <img className="w-32" src={Icon} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome de usuário"
            {...register("username", { required: "Campo obrigatório" })}
            className="border p-2 rounded-md"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Campo obrigatório" })}
            className="border p-2 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: "Campo obrigatório" })}
            className="border p-2 rounded-md"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
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
