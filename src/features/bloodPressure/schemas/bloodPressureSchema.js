import * as Yup from "yup";

export const initialValues = {
  dia: "",
  pul: "",
  sys: "",
  createBy: "",
};

const BloodPressureSchema = Yup.object().shape({
});

export default BloodPressureSchema;
