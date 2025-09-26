import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/companyApi";
import { 
    setIsLoading, 
    setCompanyObj, 
} from "../slices/companySlice";
import { Modal } from "antd";
import { Alert } from "components/elements";

function useCompany(){
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.company.isLoading);
  const companyObj = useSelector((state) => state.company.companyObj);

  const [pagination, setPagination] = useState({ page: 0, size: 25 });
  const [filter, setFilter] = useState({});

  const getCompanyObj = useCallback(
    async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getCompanyObj();
        dispatch(setCompanyObj(response.data.data || []));
        
      } catch (error) {
        console.error("Error fetching companyObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [setCompanyObj]
  );

  const onSubmit = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("company.message.edit")}</p>,
          async onOk() {
             const response = (values?.companyName!=null)? await services.updateCompanyName(values): await services.updateCompanyDescription(values);
            Alert({
              message: response.data.message || "Success",
            });
            dispatch(setCompanyObj(response.data.data || []));
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


  useEffect(() => {
    getCompanyObj();
  }, [getCompanyObj]);

  return {
    companyObj,
    isLoading,
    pagination,
    filter,
    onSubmit,
  };
}

export default useCompany;
