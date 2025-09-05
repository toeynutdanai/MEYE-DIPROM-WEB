import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  hospitalNumber: "",
  gender: "",
  age: 0,
};

const PatientEditSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  hospitalNumber: Yup.string().required("HN is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(1, "Age must be greater than or equal to 1")
    .max(120, "Age must be less than or equal to 120")
    .required("Age is required"),
});

export default PatientEditSchema;
