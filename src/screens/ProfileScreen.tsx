import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from '../../cloudinaryConfig';
import { BASE_URL } from '../../config';

library.add(fas);

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(require('../assets/app_images/profile.png'));
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Error', 'User not authenticated.');
                navigation.navigate('Login');
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/api/users/me/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const { first_name, last_name, username, profile_image } = response.data;
                setFirstName(first_name);
                setLastName(last_name);
                setUsername(username);
                if (profile_image) {
                    setProfileImage({ uri: profile_image });
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                Alert.alert('Error', 'Failed to load profile data.');
            }
        };

        fetchProfileData();
    }, []);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets) {
                const selectedImage = response.assets[0];
                setProfileImage({ uri: selectedImage.uri });

                // Upload the image to Cloudinary
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.fileName,
                });
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                setLoading(true);

                try {
                    const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    const imageUrl = cloudinaryResponse.data.secure_url;
                    console.log('Image uploaded to Cloudinary:', imageUrl);

                    // Refresh the profile image
                    setProfileImage({ uri: imageUrl });

                    const token = await AsyncStorage.getItem('access_token');
                    if (!token) {
                        Alert.alert('Error', 'User not authenticated.');
                        navigation.navigate('Login');
                        return;
                    }

                    // Save the image URL in the backend
                    const backendResponse = await axios.patch(
                        `${BASE_URL}/api/users/profile-picture/`,
                        {
                            profile_image: imageUrl,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    console.log('Image URL saved in backend:', backendResponse.data);
                } catch (err) {
                    console.error('Error uploading image:', err);
                    Alert.alert('Error', 'Failed to upload image.');
                } finally {
                    setLoading(false);
                }
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
            <Text style={styles.nameText}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.usernameText}>@{username}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.logoutButton} onPress={async () => {
                    await AsyncStorage.removeItem('access_token');
                    await AsyncStorage.removeItem('refresh_token');
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
            )}
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
