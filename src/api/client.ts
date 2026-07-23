import axios from 'axios';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global Error Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network Error (backend is down or unreachable)
      toast.error('Network Error: Unable to connect to the server.', {
        id: 'global-network-error', // prevent duplicate toasts
      });
    } else if (error.response.status >= 500) {
      toast.error('Server Error: Something went wrong on the server.', {
        id: 'global-server-error',
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
