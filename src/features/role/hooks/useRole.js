import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/roleApi";
import { 
    setIsLoading, 
    setPermissionList,
    setRoleList,
    setMappingList 
} from "../slices/roleSlice";
import { Modal } from "antd";
import { Alert } from "components/elements";

function useRole(){
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.role.isLoading);
  const permissionList = useSelector((state) => state.role.permissionList);
  const roleList = useSelector((state)=> state.role.roleList);
  const mappingList = useSelector((state)=>state.role.mappingList);

  const getPermissionMappingRole = useCallback(
    async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getPermissionMappingRole();
        dispatch(setPermissionList(response.data.data.permissions || []));
        dispatch(setRoleList(response.data.data.roles || []));
        dispatch(setMappingList(response.data.data.mappings || []));
      } catch (error) {
        console.error("Error fetching getPermissionMappingRole:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("role.message.save")}</p>,
          async onOk() {
             const response = await services.updateRoleMappingPermission(values);
            Alert({
              message: response.data.message || "Success",
            });
            // dispatch(setCompanyObj(response.data.data || []));
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
    getPermissionMappingRole();
  }, [getPermissionMappingRole]);

  return {
    isLoading,
    permissionList,
    roleList,
    mappingList,
    onSubmit,
  };
}

export default useRole;
