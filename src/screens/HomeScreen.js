import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';

// Terima 'navigation' dari props
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* === HEADER === */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beranda</Text>
        <Text style={styles.headerSubtitle}>Selamat Datang di Aplikasi Mahasiswa</Text>
      </View>

      {/* === MENU LIST (Card Vertikal) === */}
      <View style={styles.menuContainer}>

        {/* --- Card 1: Data Mahasiswa --- */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('StudentList')}>
          <Text style={styles.cardText}>Data Mahasiswa</Text>
        </TouchableOpacity>

        {/* --- Card 2: Buka Profil --- */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.cardText}>Profile Saya</Text>
        </TouchableOpacity>

        {/* --- Card 3: Logout --- */}
        <TouchableOpacity
          style={[styles.card, styles.cardLogout]}
          onPress={() => navigation.replace('Login')}>
          <Text style={[styles.cardText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Latar belakang abu-abu muda
  },
  // --- Header Styles ---
  header: {
    backgroundColor: '#4A90E2', // Warna biru modern
    height: 180, // Sedikit lebih pendek
    paddingTop: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  // --- Menu Card Styles ---
  menuContainer: {
    flex: 1,
    alignItems: 'center', // Pusatkan kartu secara horizontal
    padding: 20,
    marginTop: -50, // <-- Trik agar card menimpa header
  },
  card: {
    backgroundColor: '#fff',
    width: '100%', // Buat kartu penuh lebar
    height: 90, // Tinggi kartu
    marginVertical: 10, // Jarak antar kartu
    borderRadius: 15,
    padding: 15,
    alignItems: 'center', // Pusatkan teks
    justifyContent: 'center', // Pusatkan teks
    // Shadow untuk Android
    elevation: 8,
    // Shadow untuk iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: {
    fontSize: 20, // Perbesar teks karena tidak ada icon
    fontWeight: '600',
    color: '#333',
  },
  // --- Card Khusus Logout ---
  cardLogout: {
    backgroundColor: '#FFF0F0',
    borderColor: '#E74C3C',
    borderWidth: 1,
    elevation: 4,
  },
  logoutText: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
});

export default HomeScreen;