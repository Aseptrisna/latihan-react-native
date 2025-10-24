import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateStudent } from '../services/studentService';

const MahasiswaEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { student } = route.params; // Ambil data student dari parameter navigasi

  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [loading, setLoading] = useState(false);

  // Isi form dengan data yang ada saat komponen dimuat
  useEffect(() => {
    if (student) {
      setNim(student.nim);
      setNama(student.nama);
      setJurusan(student.jurusan);
      setAngkatan(String(student.angkatan)); // Ubah ke string untuk TextInput
    }
  }, [student]);

  const handleUpdate = async () => {
    if (!nim || !nama || !jurusan || !angkatan) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        nim,
        nama,
        jurusan,
        angkatan: parseInt(angkatan, 10),
      };
      await updateStudent(student._id, updatedData);
      Alert.alert('Sukses', 'Data mahasiswa berhasil diperbarui');
      navigation.goBack(); // Kembali ke layar list
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={styles.input}
          value={nim}
          onChangeText={setNim}
          placeholder="Masukkan NIM"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          value={nama}
          onChangeText={setNama}
          placeholder="Masukkan Nama Lengkap"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Jurusan</Text>
        <TextInput
          style={styles.input}
          value={jurusan}
          onChangeText={setJurusan}
          placeholder="Masukkan Jurusan"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Angkatan</Text>
        <TextInput
          style={styles.input}
          value={angkatan}
          onChangeText={setAngkatan}
          placeholder="Masukkan Tahun Angkatan"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Memperbarui...' : 'Perbarui'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Gunakan styles yang sama dengan MahasiswaAddScreen
// (Copy-paste styles dari MahasiswaAddScreen.js ke sini)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745', // Warna hijau untuk update
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MahasiswaEditScreen;