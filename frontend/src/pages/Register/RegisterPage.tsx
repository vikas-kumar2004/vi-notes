import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Lock, Loader2, CheckCircle2 } from "lucide-react";

import InputField from "../../components/ui/InputField";
import { registerUser } from "../../services/auth.service";
import { validateRegisterForm } from "../../utils/validation";
import {
  RegisterFormValues,
  FormErrors,
  ApiUser,
  SubmitStatus,
} from "../../types/auth.types";

const RegisterPage: React.FC = () => {
  const [values, setValues] = useState<RegisterFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Record<keyof RegisterFormValues, boolean>
  >({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [apiError, setApiError] = useState<string>("");
  const [createdUser, setCreatedUser] = useState<ApiUser | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const key = name as keyof RegisterFormValues;
    const updated = { ...values, [key]: value };
    setValues(updated);
    if (touched[key]) setErrors(validateRegisterForm(updated));
  };

  const handleBlur = (id: keyof RegisterFormValues): void => {
    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors(validateRegisterForm(values));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setApiError("");

    try {
      const user = await registerUser({
        email: values.email,
        password: values.password,
      });
      setCreatedUser(user);
      setStatus("success");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  // ── Success ────────────────────────────────────────────────────────────────

  if (status === "success" && createdUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <CheckCircle2 size={44} className="text-green-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900">
            Account created!
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Registered as{" "}
            <span className="font-medium text-gray-700">
              {createdUser.email}
            </span>
          </p>

          {/* MongoDB receipt */}
          <div className="text-left bg-gray-50 rounded-lg border border-gray-200 p-3 space-y-1 font-mono text-xs">
            <p className="font-sans text-[11px] uppercase tracking-wider text-gray-400 mb-1.5">
              Saved to MongoDB
            </p>
            <p>
              <span className="text-blue-500">id</span>:{" "}
              <span className="text-gray-700">{createdUser.id}</span>
            </p>
            <p>
              <span className="text-blue-500">email</span>:{" "}
              <span className="text-gray-700">{createdUser.email}</span>
            </p>
            <p>
              <span className="text-blue-500">createdAt</span>:{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Create account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Already have one?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>

        {/* API error */}
        {status === "error" && apiError && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-600">
            {apiError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
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
            placeholder="Min. 8 characters"
            error={touched.password ? errors.password : undefined}
            icon={<Lock size={15} />}
            showToggle
            isVisible={showPassword}
            onToggleVisibility={() => setShowPassword((v) => !v)}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-1 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white
              hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Creating…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
