import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useForgotPasswordSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalid_email"))
      .required(t("validation.required")),
    phoneNumber: Yup.string()
      .min(9, t("validation.invalid_phone_no"))
      .required(t("validation.required")),
    newPassword: Yup.string()
      .min(8, t("validation.password_min_length"))
      .required(t("validation.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t("validation.passwords_must_match"))
      .required(t("validation.required"))
  });
};

export default useForgotPasswordSchema;
