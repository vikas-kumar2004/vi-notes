import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Lock, Loader2, CheckCircle2 } from "lucide-react";

import InputField from "../../components/ui/InputField";
import { loginUser } from "../../services/auth.service";
import { validateLoginForm } from "../../utils/validation";
import {
  LoginFormValues,
  LoginFormErrors,
  LoginResponse,
  SubmitStatus,
} from "../../types/auth.types";

const LoginPage: React.FC = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors]   = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof LoginFormValues, boolean>>({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [status,       setStatus]       = useState<SubmitStatus>("idle");
  const [apiError,     setApiError]     = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<LoginResponse | null>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const key = name as keyof LoginFormValues;
    const updated = { ...values, [key]: value };
    setValues(updated);
    if (touched[key]) setErrors(validateLoginForm(updated));
  };

  const handleBlur = (id: keyof LoginFormValues): void => {
    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors(validateLoginForm(values));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setApiError("");

    try {
      const user = await loginUser({
        email: values.email,
        password: values.password,
      });
      setLoggedInUser(user);
      setStatus("success");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  // ── Success ──────────────────────────────────────────────────────────────────

  if (status === "success" && loggedInUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <CheckCircle2 size={44} className="text-green-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900">Welcome back!</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Logged in as{" "}
            <span className="font-medium text-gray-700">{loggedInUser.email}</span>
          </p>

          {/* User info from MongoDB */}
          <div className="text-left bg-gray-50 rounded-lg border border-gray-200 p-3 space-y-1 font-mono text-xs">
            <p className="font-sans text-[11px] uppercase tracking-wider text-gray-400 mb-1.5">
              From MongoDB
            </p>
            <p>
              <span className="text-blue-500">id</span>:{" "}
              <span className="text-gray-700">{loggedInUser.id}</span>
            </p>
            <p>
              <span className="text-blue-500">email</span>:{" "}
              <span className="text-gray-700">{loggedInUser.email}</span>
            </p>
            <p>
              <span className="text-blue-500">createdAt</span>:{" "}
              <span className="text-gray-700">{loggedInUser.createdAt}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-sm p-8">

        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Sign in</h1>
        <p className="text-sm text-gray-500 mb-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>

        {/* API error */}
        {status === "error" && apiError && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-600">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            placeholder="you@example.com"
            error={touched.email ? errors.email : undefined}
            icon={<Mail size={15} />}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={values.password}
            placeholder="Your password"
            error={touched.password ? errors.password : undefined}
            icon={<Lock size={15} />}
            showToggle
            isVisible={showPassword}
            onToggleVisibility={() => setShowPassword((v) => !v)}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Forgot password */}
          <div className="flex justify-end -mt-2">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white
              hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;