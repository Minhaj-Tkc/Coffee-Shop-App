import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(require('../assets/app_images/minhaj.png'));

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets) {
                const selectedImage = response.assets[0];
                setProfileImage({ uri: selectedImage.uri });
            } else if (response.errorMessage) {
                Alert.alert('Error', response.errorMessage);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.profilePicContainer} onPress={handleChoosePhoto}>
                <Image
                    source={profileImage}
                    style={styles.profileImage}
                />
                <View style={styles.editIconContainer}>
                    <FontAwesomeIcon
                        icon='pencil'
                        size={15}
                        color='#d0d0d0'
                    />
                </View>
            </TouchableOpacity>
            <Text style={styles.nameText}>Minhaj Tkc</Text>
            <Text style={styles.usernameText}>@minhaj</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => {
                navigation.navigate('Login');
            }}>
                <FontAwesomeIcon
                    icon='right-from-bracket'
                    size={20}
                    color='#d0d0d0'
                    style={{ marginRight: 12 }}
                />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
    },
    profilePicContainer: {
        marginBottom: 20,
    },
    profileImage: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: '#e0e0e0',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#202020',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'white',
    },
    nameText: {
        textAlign: 'center',
        color: '#303030',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    usernameText: {
        textAlign: 'center',
        color: '#606060',
        fontSize: 14,
    },
    logoutButton: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
        marginTop: 40,
    },
    logoutText: {
        fontWeight: 'bold',
        color: '#d0d0d0',
    },
});

export default ProfileScreen;
