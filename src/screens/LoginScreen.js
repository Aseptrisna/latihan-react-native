import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { authService } from "../services/authService";
import { guidApplication } from "../const/index";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");


  const handleLogin = async () => {
    try {
      const res = await authService.login({ guidApplication, email, password });
      alert(res.message);
      setMessage("Login berhasil!");
      navigation.replace("Home");
    } catch (err) {
      alert(err.message);
      setMessage(err.message || "Login gagal");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Mahasiswa</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>Lupa Password?</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { color: '#007bff', marginTop: 10 },
});

export default LoginScreen;
