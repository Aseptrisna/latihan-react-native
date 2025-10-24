import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api-student.pptik.id/api/students',
    timeout: 10000, // 10 detik timeout
});

// Fungsi helper untuk menangani error
const handleError = (error) => {
    if (error.response) {
        // Request dibuat dan server merespons dengan status error
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        // Kembalikan pesan error dari API jika ada
        throw new Error(error.response.data.message || 'Terjadi kesalahan pada server');
    } else if (error.request) {
        // Request dibuat tapi tidak ada respons
        console.error('Error Request:', error.request);
        throw new Error('Server tidak merespons. Cek koneksi internet Anda.');
    } else {
        // Kesalahan lain saat setting request
        console.error('Error Message:', error.message);
        throw new Error(error.message || 'Terjadi kesalahan');
    }
};

// CREATE
export const createStudent = async (studentData) => {
    try {
        const response = await API.post('/', studentData);
        // API Anda sepertinya mengembalikan data utuh di 'response.data'
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// READ (Get All)
export const getAllStudents = async () => {
    try {
        const response = await API.get('/');
        // Berdasarkan respons Anda, data ada di dalam 'response.data.data'
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

// UPDATE
export const updateStudent = async (id, studentData) => {
    try {
        const response = await API.put(`/${id}`, studentData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE
export const deleteStudent = async (id) => {
    try {
        const response = await API.delete(`/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};