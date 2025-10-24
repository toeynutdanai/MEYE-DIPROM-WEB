/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import config from "config";
import jsonToFormData from "lib/jsonToFormData";
import session from "utils/session";
import alert from "components/elements/Alert";

const setAppError = (e, message) => {
  // alert(message);
  alert({
    type: "error",
    className: "my-noti",
    message: "Error",
    description: message
  });
  return Promise.reject({ ...e, message });
};

class Api {
  constructor() {
    this.http = axios.create({
      baseURL: `${config.REACT_APP_API_HOST}`,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, ////จำเป็นสำหรับ HttpOnly Cookie
    });

    this.http.interceptors.request.use(
      async (config) => ({
        ...config,
        headers: this.prepareRequestHeaders(config.headers),
        params: this.prepareRequestParams(
          config.params,
          config.isFormData || false
        ),
        data: this.prepareRequestParams(
          config.data,
          config.isFormData || false
        ),
      }),
      null || undefined
    );

    this.http.interceptors.response.use(
      (response) => {
        if (!response.data.status?.code) return this.handleSuccess(response);
        if (response.data.status.code.substring(0, 1) === "2")
          return this.handleSuccess(response);
        else return this.handleError(response);
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && error.response?.data?.message==='token_expired' && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const token = await this.refresh();
            if(token===''){
              return this.onSessionExpired(error);
            }

            originalRequest.headers["Authorization"] = 'Bearer ' + token;
            return this.http(originalRequest);
          } catch (_error) {
            return this.handleError(error)
          }
        }else{
          return this.handleError(error);
        }
      }
    );
  }

  refresh = async () => {
    try {
      const response = await this.post("/auth/refresh");
      const token = response?.data?.token || '';
      if (token) {
        session.setAuthToken(token);
        return token;
      } else {
        return '';
      }
    } catch (error) {
      console.log(error)
      return '';
    }
};

  prepareRequestHeaders(headers) {
    const token = session.getAuthToken();
    const lang = (window.localStorage.getItem("lang") || "en").toUpperCase();
    return {
      ...headers,
      lang,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }
  prepareRequestParams = (params, isFormData) => {
    if (!params) return;
    if (isFormData)
      return jsonToFormData(params, {
        transfromPropName: (key) => key,
        showLeafArrayIndexes: false,
      });

    return params;
  };

  prepareResponseData(data) {
    return data;
  }

  handleSuccess(response) {
    if (response.headers["content-type"] === "application/octet-stream") {
      return response;
    } else {
      return { ...response, data: this.prepareResponseData(response.data) };
    }
  }

  onUnauthorized(e) {
    const { response } = e;
    return setAppError(e, response?.data.message);
  }

  onNotFound(e) {
    const { response } = e;
    return setAppError(e, response?.data.message);
  }

  onBadRequest(e) {
    const { response } = e;
    return setAppError(e, response?.data.message);
  }

  onValidateFailed(e) {
    const { response } = e;
    if (response?.data?.errors && Array.isArray(response?.data?.errors)) {
      (response?.data?.errors || []).forEach((error) => alert(error.message));
      let messages = JSON.stringify(response?.data.errors, null, 2);
      return Promise.reject({ ...e, messages });
    }
    return setAppError(
      e,
      JSON.stringify(response?.data.message || response?.data.errors, null, 2)
    );
  }

  onServerError(e) {
    return setAppError(e, "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }

  onRequestTimeout(e) {
    return setAppError(e, "INTERNET ล่าช้า กรุณาลองใหม่อีกครั้ง");
  }

  onNetworkError(e) {
    return setAppError(
      e,
      "การเชื่อมต่อกับเซิฟเวอร์มีปัญหา กรุณาลองใหม่อีกครั้งภายหลัง"
    );
  }

  onSessionExpired(e) {
    return setAppError(e,"Session expired, please login again.");
  }

  handleError(e) {
    const { response } = e;
    if (response) {
      const { code } = response.data;
      if (code === "unauthorized") return this.onUnauthorized(e);
      if (code === "not_found") return this.onNotFound(e);
      if (code === "server_error") return this.onServerError(e);
      if (code === "bad_request") return this.onBadRequest(e);
      if (code === "validate_failed") return this.onValidateFailed(e);
      const error = { ...e, response: this.prepareResponseData(response) };
      return Promise.reject(error);
    } else {
      if (/timeout/.test(e.message)) return this.onRequestTimeout(e);
      if (/Network/.test(e.message)) return this.onNetworkError(e);
      return Promise.reject(e);
    }
  }

  get(path, params = {}, options = {}) {
    return this.http.get(path, { params, ...options });
  }

  post(path, params, options = {}) {
    return this.http.post(path, params, options);
  }

  put(path, params, options = {}) {
    return this.http.put(path, params, options);
  }

  patch(path, params, options = {}) {
    return this.http.patch(path, params, options);
  }

  delete(path, params) {
    return this.http.delete(path, { params });
  }
}

const apiInstance = new Api();

export default apiInstance;
