import api from "lib/api";

export const getCompanyObj = async () => {
    return await api.post("/manageCompany/getCompany");
};
export const updateCompanyName = async (params) => {
    return await api.post("/manageCompany/updateCompanyName",params);
};
export const updateCompanyDescription = async (params) => {
    return await api.post("/manageCompany/updateCompanyDescription",params);
};

