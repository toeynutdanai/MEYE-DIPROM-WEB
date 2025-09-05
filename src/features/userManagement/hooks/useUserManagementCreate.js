import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { generateRandomString } from "utils/helper";
import * as services from "../services/adminApi";
import { setIsLoading } from "../slices/adminSlice";

function useUserManagementCreate() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.admin.isLoading);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("admin.message.create")}</p>,
          async onOk() {
            const response = await services.createAdmin({
              requestId: generateRandomString(),
              email: values.email,
              phoneNumber: values.phoneNumber,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
            });
            Alert({
              message: response.data.status.details[0].value || "Success",
            });
            navigate("/user_management");
          },
          okText: t("common.confirm"),
          cancelText: t("common.cancel"),
        });
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, t]
  );

  return {
    isLoading,
    onSubmit,
  };
}

export default useUserManagementCreate;
