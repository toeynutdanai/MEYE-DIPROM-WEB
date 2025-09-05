import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

const UserManagementCreateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .length(8, "Password must be at least 8 characters"),
});

export default UserManagementCreateSchema;
