import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { COLORS, SPACING } from '../theme/theme'



const ProfilePic: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    <View style={styles.ImageContainer}>
      <Image source={require('../assets/app_images/profile.png')} style={styles.Image} />
    </View>
    </TouchableOpacity>
  )
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
})

export default ProfilePic