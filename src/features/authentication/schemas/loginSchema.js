import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useLoginSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    username: Yup.string()
      // .email(t("sign_in.validate.invalid_username"))
      .required(t("sign_in.validate.please_enter_your_username")),
    password: Yup.string()
      .min(8, t("sign_in.validate.password_must_be_at_least_8_characters"))
      .required(t("sign_in.validate.please_enter_your_password")),
  });
};

export default useLoginSchema;
