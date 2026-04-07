import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/api";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (values) => {
    const { data } = await api.post("/api/auth/login", values);
    setSession(data);
    navigate("/");
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>
        <input {...register("email")} placeholder="Email" className="w-full rounded-xl border p-3" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full rounded-xl border p-3" />
        <button disabled={formState.isSubmitting} className="w-full rounded-xl bg-indigo-600 text-white p-3">
          Continue
        </button>
      </form>
    </div>
  );
}
