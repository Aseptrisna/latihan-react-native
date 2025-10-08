import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { authService } from "../services/authService";

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        try {
            const res = await authService.forgotPassword({ email });
            console.log(res)
            alert(res.message);
            setMessage("Permintaan reset password berhasil dikirim ke email Anda!");
            setTimeout(() => navigation.replace("Login"), 1500);
        } catch (err) {
            setMessage(err.message || "Gagal mengirim permintaan reset password");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lupa Password</Text>

            <TextInput
                style={styles.input}
                placeholder="Masukkan Email Anda"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <Button title="Kirim Permintaan Reset" onPress={handleForgotPassword} />

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <Text
                style={styles.link}
                onPress={() => navigation.replace("Login")}
            >
                Kembali ke Login
            </Text>
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
    link: {
        textAlign: "center",
        marginTop: 15,
        color: "#007BFF",
        textDecorationLine: "underline",
    },
    message: { marginTop: 15, textAlign: "center", color: "green" },
});

export default ForgotPasswordScreen;
