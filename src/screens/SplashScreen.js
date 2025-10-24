import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Timer untuk splash screen
    const timer = setTimeout(() => {
      // Pindahkan ke layar Login dan 'replace' (ganti) stack
      // 'replace' penting agar pengguna tidak bisa kembali ke splash screen
      navigation.replace('Login'); 
    }, 3000); // 3000ms = 3 detik

    // Membersihkan timer jika komponen di-unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Ganti dengan Logo Anda jika ada */}
      <Text style={styles.title}>Aplikasi Mahasiswa</Text>
      <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff', // Warna biru, sesuaikan dengan tema Anda
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default SplashScreen;