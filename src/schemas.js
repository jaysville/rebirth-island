import { Password } from "@mui/icons-material";
import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup.string().required("FIeld is required"),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email")
    .email("Invalid email!")
    .required("Field is required"),
  password: yup
    .string()
    .min(5, "Pasword should contain at least 5 characters")
    .max(12, "password should not exceed 12 characters")
    .required("Password must include 5-12 characters"),
  confirmPassword: yup
    .string()
    .test("password-match", "Passwords do not match!", function (value) {
      return value === this.parent.password;
    })
    .required("Feild is required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email")
    .email("Invalid email!")
    .required("Field is required"),
  password: yup.string().required("Field is required"),
});
