import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import Spinner from "../Icons/Spinner";
import Callout from "../components/Callout";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

function Login() {
  const { handleLogin, user } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // i return the error message from the handleLogin if there is error
    const errMsg = await handleLogin(data, reset);

    if (errMsg) {
      setErr(errMsg);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);

  return (
    <div>
      {err && (
        <Callout type="error" title="Error">
          {err}
        </Callout>
      )}
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && (
            <span className="err-msg">{`${errors.email.message}`}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <span className="err-msg">{`${errors.password.message}`}</span>
          )}
        </div>

        <button className={`btn`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Login"}
        </button>
      </form>
      <p className="form-foot">
        Don&apos;t have an account? Register <Link to="/register">here</Link>
      </p>
    </div>
  );
}

export default Login;
