export interface RegisterFormValues {
  email: string;
  password: string;
 
}

export interface FormErrors {
  email?: string;
  password?: string;
 
}

export interface ApiUser {
  id: string;
  email: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface ApiErrorResponse {
  message?: string;
}

export type SubmitStatus = "idle" | "loading" | "success" | "error";





// ─── Login ────────────────────────────────────────────────────────────────────
 
export interface LoginFormValues {
  email: string;
  password: string;
}
 
export interface LoginFormErrors {
  email?: string;
  password?: string;
}
 
export interface LoginPayload {
  email: string;
  password: string;
}
 
export interface LoginResponse {
  id: string;
  email: string;
  createdAt: string;
}