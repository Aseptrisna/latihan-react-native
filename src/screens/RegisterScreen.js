import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { authService } from "../services/authService";
import { companyGuid, Role, guidApplication } from '../const';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    const userData = {
      companyGuid,
      email,
      password,
      name,
      phoneNumber,
      guidApplication,
      role: Role,
    };
    try {
      await authService.register(userData);
      alert(`Akun ${email} berhasil didaftarkan!`);
      setMessage("Registrasi berhasil! Silakan login.");
      navigation.replace("Activation");
    } catch (err) {
      alert(`Akun ${email} ${err.message}!`);
      setMessage(err.message || "Registrasi gagal");
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun Mahasiswa</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <InputField placeholder="Nama" value={name} onChangeText={setName} />
      <InputField placeholder="Nomor Telpon" value={phoneNumber} onChangeText={setphoneNumber} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.btnText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Sudah punya akun? Login</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { color: '#007bff', marginTop: 10 },
});

export default RegisterScreen;
