export default function setupAxios(axios, _store) {
    axios.interceptors.request.use(
        config => {
            const authToken = localStorage.getItem("token");
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            if (config.url === "upload/upload-file") {
                config.baseURL = `${import.meta.env.VITE_REACT_APP_UPLOAD_HOST}/${import.meta.env.VITE_REACT_APP_API_PATH}/`;
            } else {
                config.baseURL = `${import.meta.env.VITE_REACT_APP_API_HOST}/${import.meta.env.VITE_REACT_APP_API_PATH}/`;
            }
            return config;
        },
        err => Promise.reject(err),
    );

    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error?.response?.status === 401 && error?.response?.data?.error === "Unauthorized") {
                console.dir(error);
                localStorage.clear();
                window.location.reload();
            }
            return Promise.reject(error);
        },
    );
}
