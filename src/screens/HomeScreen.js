import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: "1",
      title: "Profil",
      icon: "account-circle-outline",
      color: "#4A90E2",
      onPress: () => navigation.navigate("Profile"),
    },
    {
      id: "2",
      title: "Data Kamera",
      icon: "video-outline",
      color: "#50E3C2",
      onPress: () => navigation.navigate("DataKamera"),
    },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.menuCard, { backgroundColor: item.color }]}
      onPress={item.onPress}
    >
      <Icon name={item.icon} size={40} color="#fff" />
      <Text style={styles.menuTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏫 Aplikasi Mahasiswa</Text>
        <Text style={styles.subtitle}>Selamat datang kembali 👋</Text>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.menuContainer}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Aplikasi Mahasiswa</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    marginTop: 10,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  row: {
    justifyContent: "space-between",
  },
  menuCard: {
    flex: 1,
    height: 130,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  menuTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    padding: 10,
  },
  footerText: {
    color: "#999",
    fontSize: 12,
  },
});
