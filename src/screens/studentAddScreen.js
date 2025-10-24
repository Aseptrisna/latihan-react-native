import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStudent } from '../services/studentService';

const MahasiswaAddScreen = () => {
  const navigation = useNavigation();
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nim || !nama || !jurusan || !angkatan) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const newData = {
        nim,
        nama,
        jurusan,
        angkatan: parseInt(angkatan, 10), // Pastikan angkatan adalah angka
      };
      await createStudent(newData);
      Alert.alert('Sukses', 'Data mahasiswa berhasil ditambahkan');
      navigation.goBack(); // Kembali ke layar list
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan data');
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
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ... Styles ...
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
    backgroundColor: '#007bff',
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

export default MahasiswaAddScreen;