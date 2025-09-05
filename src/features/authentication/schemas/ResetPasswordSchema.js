import { isPassword } from "utils/validators";
import * as Yup from "yup";

export const initialValues = {
  newPassword: null,
  newPasswordConfirm: null,
};

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .test("is-password", "Password is invalid.", (value) => isPassword(value))
    .required("Password is required."),
  newPasswordConfirm: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
});

export default ResetPasswordSchema;
