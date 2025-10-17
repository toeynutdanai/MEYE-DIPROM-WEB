import * as Yup from "yup";

const UserManagementEditSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  role: Yup.string()
    .required("Role is required"),
  status: Yup.string()
    .required("Status is required"),
});

export default UserManagementEditSchema;
