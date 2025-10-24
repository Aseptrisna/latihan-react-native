import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAllStudents, deleteStudent } from '../services/studentService';

const MahasiswaListScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); // Hook untuk deteksi fokus layar
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fungsi untuk memuat data
    const loadStudents = async () => {
        setLoading(true);
        try {
            const data = await getAllStudents();
            setStudents(data);
        } catch (error) {
            Alert.alert('Error', 'Gagal memuat data mahasiswa');
        } finally {
            setLoading(false);
        }
    };

    // Muat data saat layar pertama kali dibuka atau saat kembali fokus
    useEffect(() => {
        if (isFocused) {
            loadStudents();
        }
    }, [isFocused]);

    // Handler untuk hapus data
    const handleDelete = (id) => {
        Alert.alert(
            'Konfirmasi Hapus',
            'Apakah Anda yakin ingin menghapus data ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteStudent(id);
                            Alert.alert('Sukses', 'Data mahasiswa berhasil dihapus');
                            loadStudents(); // Muat ulang data setelah hapus
                        } catch (error) {
                            Alert.alert('Error', 'Gagal menghapus data');
                        }
                    },
                },
            ]
        );
    };

    // Render item untuk FlatList
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemNama}>{item.nama}</Text>
                <Text style={styles.itemNim}>{item.nim} - {item.jurusan}</Text>
                <Text style={styles.itemAngkatan}>Angkatan: {item.angkatan}</Text>
            </View>
            <View style={styles.itemActions}>
                <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={() => navigation.navigate('StudentUpdate', { student: item })}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => handleDelete(item.guid)}
                >
                    <Text style={styles.buttonText}>Hapus</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={students}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.list}
                    onRefresh={loadStudents} // Tarik untuk refresh
                    refreshing={loading}
                />
            )}
            {/* Tombol Tambah di pojok kanan bawah */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('StudentAdd')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// ... Styles ...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    list: {
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    itemInfo: {
        flex: 1,
    },
    itemNama: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemNim: {
        fontSize: 14,
        color: '#666',
    },
    itemAngkatan: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    itemActions: {
        flexDirection: 'row',
    },
    buttonEdit: {
        backgroundColor: '#ffc107',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 8,
    },
    buttonDelete: {
        backgroundColor: '#dc3545',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#007bff',
        borderRadius: 28,
        elevation: 8,
    },
    fabText: {
        fontSize: 30,
        color: 'white',
    },
});

export default MahasiswaListScreen;