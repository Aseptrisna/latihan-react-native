import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { authService } from "../services/authService";
import { guidApplication } from "../const/index";

const ActivationScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const handleActivate = async () => {
        try {
            const res = await authService.activateAccount({
                email,
                guidApplication,
                otp: Number(otp),
            });
            alert(res.data.message);
            setMessage("Akun berhasil diaktivasi! Silakan login.");
            setTimeout(() => navigation.replace("Login"), 1500);
        } catch (err) {
            setMessage(err.message || "Aktivasi gagal, periksa data Anda.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aktivasi Akun</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Kode OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
            />

            <Button title="Aktivasi Sekarang" onPress={handleActivate} />

            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    message: { marginTop: 15, textAlign: "center", color: "green" },
});

export default ActivationScreen;
