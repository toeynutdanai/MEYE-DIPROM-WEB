import * as Yup from "yup";

export const initialValues = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
};

const UserManagementSchema = Yup.object().shape({});

export default UserManagementSchema;
