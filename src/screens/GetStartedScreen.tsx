// screens/GetStartedScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FONTFAMILY } from '../theme/theme';

type RootStackParamList = {
  GetStarted: undefined;
  Signup: undefined;
  Signin: undefined;
};

interface Props {
    navigation: any;
}



const GetStartedScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/\coffee_assets\cappuccino\portrait\cappuccino_pic_1_portrait.png')} style={styles.image} />
      <Text style={styles.title}>Welcome to Coffee Shop</Text>
      <Text style={styles.subtitle}>Discover the best coffee in town</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <Text style={styles.signinText}>
        Already have an account?{' '}
        <Text style={styles.signinLink} onPress={() => navigation.navigate('Signin')}>
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: FONTFAMILY.LeckerliOneRegular,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6f4e37',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signinText: {
    fontSize: 16,
    color: '#888',
  },
  signinLink: {
    color: '#6f4e37',
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;
