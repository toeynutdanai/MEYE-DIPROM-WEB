import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const UserManagementEditSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
});

export default UserManagementEditSchema;
