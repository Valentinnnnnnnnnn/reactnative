import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const Profile: React.FC = () => {
    const handleLogout = () => {
        // Ajoutez ici la logique de déconnexion si nécessaire
        Alert.alert('Déconnexion', 'Vous êtes déconnecté !');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <Button title="Déconnexion" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    }
});

export default Profile;