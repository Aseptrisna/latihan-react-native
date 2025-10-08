import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DataKameraScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    // Simulasi data dari API
    setTimeout(() => {
      setCameras([
        {
          id: "CAM-001",
          name: "Kamera Gerbang Utama",
          status: "Online",
          location: "Kampus Utama",
        },
        {
          id: "CAM-002",
          name: "Kamera Parkiran Barat",
          status: "Offline",
          location: "Gedung Parkir B",
        },
        {
          id: "CAM-003",
          name: "Kamera Lab Komputer",
          status: "Online",
          location: "Gedung D Lt.2",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailKamera", { camera: item })}
    >
      <View style={styles.cardHeader}>
        <Icon
          name={item.status === "Online" ? "camera" : "camera-off"}
          size={35}
          color={item.status === "Online" ? "#4CAF50" : "#E53935"}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cameraName}>{item.name}</Text>
          <Text style={styles.cameraLocation}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.statusBadgeContainer}>
        <Text
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "Online" ? "#4CAF50" : "#E53935",
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <Text style={styles.title}>📷 Data Kamera</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={cameras}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default DataKameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  cameraLocation: {
    fontSize: 13,
    color: "#666",
  },
  statusBadgeContainer: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  statusBadge: {
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
  },
});
