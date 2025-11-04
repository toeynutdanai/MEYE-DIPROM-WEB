import * as Yup from "yup";

const useCompanySchema = () => {

  return Yup.object().shape({
    companyName: Yup.string()
      .required("Company name is required"),
  });
};

export default useCompanySchema;