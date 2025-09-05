import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const signUpInitialValues = {
  name: "",
  surName: "",
  email: "",
  password: "",
  phone: "",
  agreeTermsAndCond: false,
};

const useSignUpSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    name: Yup.string().required(t("sign_up.validation.please_enter_your_name")),
    surName: Yup.string().required(t("sign_up.validation.please_enter_your_surname")),
    email: Yup.string()
      .email(t("sign_up.validation.invalid_email"))
      .required(t("sign_up.validation.please_enter_your_email")),
    password: Yup.string()
      .min(8, t("sign_up.validation.password_must_be_at_least_8_characters"))
      .required(t("sign_up.validation.please_enter_your_password")),
    phone: Yup.string()
      .min(9, t("sign_up.validation.invalid_phone_no"))
      .max(12, t("sign_up.validation.invalid_phone_no"))
      .required(t("sign_up.validation.please_enter_your_phone_no")),
  });
};

export default useSignUpSchema;
