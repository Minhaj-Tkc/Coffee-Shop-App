import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';

const ProfilePic: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          const response = await axios.get(`${BASE_URL}/api/users/me/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const imageUrl = response.data.profile_image;
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <View style={styles.ImageContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.secondaryDarkGreyHex} />
        ) : (
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/app_images/profile.png')}
            style={styles.Image}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  }
});

export default ProfilePic;
