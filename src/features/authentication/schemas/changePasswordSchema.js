import { isPassword } from "utils/validators";
import * as Yup from "yup";

export const initialValues = {
  oldPassword: null,
  newPassword: null,
  newPasswordConfirm: null,
};

const PasswordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters");
  // .test("is-password", "Password is invalid.", (value) => isPassword(value));

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: PasswordSchema.required("Old Password is required."),
  newPassword: PasswordSchema.required("New Password is required.").notOneOf(
    [Yup.ref("oldPassword"), null],
    "New password cannot be the same as old passwordmatch."
  ),
  newPasswordConfirm: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
});

export default ChangePasswordSchema;
