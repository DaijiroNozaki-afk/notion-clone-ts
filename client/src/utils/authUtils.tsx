import { AxiosResponse } from 'axios';
import authApi from '../api/authApi';

const authUtils = {
  // JWT チェック
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const res: AxiosResponse = await authApi.verifyToken();
      return res.data.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
