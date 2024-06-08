import React, { useState, useEffect } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS, FONTFAMILY } from "../theme/theme";
import axios from "axios";
import { BASE_URL } from "../../config";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [checkingToken, setCheckingToken] = useState<boolean>(true);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('access_token');
                if (accessToken) {
                    const response = await axios.get(`${BASE_URL}/api/users/me/`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    if (response.status === 200) {
                        navigation.navigate('Tab');
                        return;
                    }
                }
            } catch (error) {
                console.error('Error validating token:', error);
            } finally {
                setCheckingToken(false);
            }
        };

        validateToken();
    }, [navigation]);

    const onSignIn = async () => {
        // Reset previous errors
        setUsernameError('');
        setPasswordError('');

        // Validation checks
        let hasError = false;
        if (!username) {
            setUsernameError('Username not provided');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Password not provided');
            hasError = true;
        }
        if (hasError) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/users/login/`, {
                username,
                password,
            });

            console.log('API Response:', response.data); // Debug log

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            if (accessToken && refreshToken) {
                await AsyncStorage.setItem('access_token', accessToken);
                await AsyncStorage.setItem('refresh_token', refreshToken);
                Alert.alert('Success', 'Logged in successfully!');
                navigation.navigate('Tab');
            } else {
                Alert.alert('Error', 'Token is missing in the response.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            if (axios.isAxiosError(err) && err.response) {
                console.error('Error response data:', err.response.data);
                Alert.alert('Error', err.response.data.error || 'Failed to login.');
            } else {
                Alert.alert('Error', 'Failed to login.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (checkingToken) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primaryBlackHex} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoidingContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>Login</Text>
                        <Input
                            title='Username'
                            value={username}
                            error={usernameError}
                            setValue={setUsername}
                            setError={setUsernameError}
                        />
                        <Input
                            title='Password'
                            value={password}
                            error={passwordError}
                            setValue={setPassword}
                            setError={setPasswordError}
                            secureTextEntry={true}
                        />
                        {loading ? (
                            <ActivityIndicator size="large" color={COLORS.primaryBlackHex} />
                        ) : (
                            <Button title='Sign In' onPress={onSignIn} />
                        )}
                        <Text style={styles.signUpText}>
                            Don't have an account?
                            <Text
                                style={styles.signUpLink}
                                onPress={() => navigation.navigate('Signup')}
                            >
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 36,
        color: '#202020',
        fontFamily: FONTFAMILY.poppins_bold,
    },
    signUpText: {
        textAlign: 'center',
        marginTop: 40,
    },
    signUpLink: {
        color: 'blue',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
