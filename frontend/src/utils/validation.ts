import { RegisterFormValues, FormErrors, LoginFormValues, LoginFormErrors } from "../types/auth.types";

export const validateRegisterForm = (values: RegisterFormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Must include an uppercase letter.";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Must include a number.";
  }

 
  return errors;
};

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Must be at least 6 characters.";
  }

  return errors;
};