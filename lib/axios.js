import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosInstance = axios.create({
  // baseURL: process.env.BACKEND_BASE_URL,
  withCredentials: true,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});

export const setupInterceptors = (store) => {
  createAuthRefreshInterceptor(axiosInstance, (failedRequest) => axiosInstance
    .post('/api/auth/refresh/', {
      // [localStorage.getItem('login_method')]: localStorage.getItem('username'),
      user_id: store.getState().authReducer?.username,
      refresh: store.getState().authReducer?.refreshToken,
    })
    .then((resp) => {
      const { access_tok: accessToken } = resp.data;
      const bearer = `${
        process.env.JWT_AUTH_HEADER ?? 'Bearer'
      } ${accessToken}`;
      axiosInstance.defaults.headers.Authorization = bearer;
      failedRequest.response.config.headers.Authorization = bearer;
      return Promise.resolve();
    }), { statusCodes: [401, 403] });
};

export default axiosInstance;

// if your token is expired you need this code for resending redfresh token and geeting a access token