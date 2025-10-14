import * as Yup from "yup";

export const initialValues = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  confirmPassword: "",
  role: "",
  status: "",
};

const UserManagementCreateSchema = Yup.object().shape({
  username: Yup.string().required("User name is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^.{8,}$/, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least 1 uppercase letter (A-Z)")
    .matches(/[a-z]/, "Must contain at least 1 lowercase letter (a-z)")
    .matches(/[+\-#<>=@_!$]/, "Must contain at least 1 special character (+ - # < > = @ _ ! $)")
    .test(
      "no-thai",
      "Thai characters are not allowed",
      (val) => (val ?? "").match(/[ก-๙]/) === null
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  role: Yup.string()
    .required("Role is required"),
  status: Yup.string()
    .required("Status is required"),
});

export default UserManagementCreateSchema;
