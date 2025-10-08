import axios from 'axios';
import { API_BASE_URL_USER } from '../const';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Buat instance axios biar bisa reuse
const api = axios.create({
    baseURL: API_BASE_URL_USER,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    /**
     * Register user baru
     * @param {Object} data - { name, email, password }
     */
    async register(data) {
        try {
            const res = await api.post('/users/register', data);
            return res.data;
        } catch (error) {
            console.error('Register Error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Terjadi kesalahan server' };
        }
    },

    /**
     * Login user
     * @param {Object} data - { email, password }
     */
    async login(data) {
        try {
            const res = await api.post('/users/login', data);
            await AsyncStorage.setItem('appToken', res.data.data.appToken);
            await AsyncStorage.setItem('userToken', res.data.data.userToken);
            return res.data;
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Gagal login' };
        }
    },

    /**
     * Logout user
     */
    async logout() {
        await AsyncStorage.removeItem('token');
    },

    /**
     * Ambil token dari local storage
     */
    async getToken() {
        return await AsyncStorage.getItem('token');
    },

    /**
     * User Aktivasi
     */
    async activateAccount(data) {
        try {
            const res = await api.post('/users/activate', data);
            return res.data;
        } catch (error) {
            console.error('Aktivasi Error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Aktivasi gagal' };
        }
    },
    async forgotPassword(data) {
        try {
            const res = await api.post('/users/forgot-password', data);
            return res.data;
        } catch (error) {
            console.error(
                'Forgot Password Error:',
                error.response?.data || error.message,
            );
            throw (
                error.response?.data || {
                    message: 'Gagal mengirim email reset password',
                }
            );
        }
    },
    async getProfile() {
        const userToken = await AsyncStorage.getItem("userToken");
        const res = await api.get('/users/profile', {
            headers: { Authorization: `Bearer ${userToken}` },
        });
        return res.data;
    },
};
