import api from "lib/api";

export const getPermissionMappingRole = async () => {
    return await api.post("/managePermission/getPermissionMappingRole");
};
export const updateRoleMappingPermission = async (params) => {
    return await api.post("/managePermission/updateRoleMappingPermission",params);
};