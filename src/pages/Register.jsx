import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import Spinner from "../Icons/Spinner";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email(),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

function Register() {
  const { handleRegister, user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    handleRegister(data, reset);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input type="name" id="name" {...register("name")} />
          {errors.name && (
            <span className="err-msg">{`${errors.name.message}`}</span>
          )}
        </div>

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

        <div className="formGroup">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="err-msg">{`${errors.confirmPassword.message}`}</span>
          )}
        </div>
        <button className={`btn`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Register"}
        </button>
      </form>
      <p className="form-foot">
        Already have an account? Login <Link to="/login">here</Link>
      </p>
    </div>
  );
}

export default Register;
