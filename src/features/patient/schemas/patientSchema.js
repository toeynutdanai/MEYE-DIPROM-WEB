import * as Yup from "yup";

export const initialValues = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  hn: null,
  statusFlag: null,
  gender: null,
  age: [1, 120],
};

const PatientSchema = Yup.object().shape({
});

export default PatientSchema;
