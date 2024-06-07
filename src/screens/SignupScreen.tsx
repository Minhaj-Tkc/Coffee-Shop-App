import React, { useState } from "react";
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
import { COLORS } from "../theme/theme";
import axios from "axios";
import { BASE_URL } from "../../config";


interface SignUpScreenProps {
    navigation: any;
}

const SignupScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [password1Error, setPassword1Error] = useState<string>('');
    const [password2Error, setPassword2Error] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const onSignUp = async () => {
        // Reset previous errors
        setUsernameError('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPassword1Error('');
        setPassword2Error('');

        // Validation checks
        let hasError = false;
        if (!username || username.length < 5) {
            setUsernameError('Username must be >= 5 characters');
            hasError = true;
        }
        if (!firstName) {
            setFirstNameError('First Name was not provided');
            hasError = true;
        }
        if (!lastName) {
            setLastNameError('Last Name was not provided');
            hasError = true;
        }
        if (!email || !validateEmail(email)) {
            setEmailError('Invalid email address');
            hasError = true;
        }
        if (!password1 || password1.length < 8) {
            setPassword1Error('Password is too short');
            hasError = true;
        }
        if (password1 !== password2) {
            setPassword2Error("Passwords don't match");
            hasError = true;
        }

        // Stop if validation failed
        if (hasError) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/users/signup/`, {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password: password1,
            });

            console.log('API Response:', response.data); // Debug log

            const accessToken = response.data.access;

            if (accessToken) {
                await AsyncStorage.setItem('token', accessToken);
                Alert.alert('Success', 'Account created successfully!');
                navigation.navigate('Tab');
            } else {
                Alert.alert('Error', 'Access token is missing in the response.');
            }
        } catch (err) {
            console.error('Error during sign up:', err);
            if (axios.isAxiosError(err) && err.response) {
                console.error('Error response data:', err.response.data);
                Alert.alert('Error', err.response.data.error || 'Failed to sign up.');
            } else {
                Alert.alert('Error', 'Failed to sign up.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>Sign Up</Text>
                        <Input
                            title='Username'
                            value={username}
                            error={usernameError}
                            setValue={setUsername}
                            setError={setUsernameError}
                        />
                        <Input
                            title='First Name'
                            value={firstName}
                            error={firstNameError}
                            setValue={setFirstName}
                            setError={setFirstNameError}
                        />
                        <Input
                            title='Last Name'
                            value={lastName}
                            error={lastNameError}
                            setValue={setLastName}
                            setError={setLastNameError}
                        />
                        <Input
                            title='Email'
                            value={email}
                            error={emailError}
                            setValue={setEmail}
                            setError={setEmailError}
                        />
                        <Input
                            title='Password'
                            value={password1}
                            error={password1Error}
                            setValue={setPassword1}
                            setError={setPassword1Error}
                            secureTextEntry={true}
                        />
                        <Input
                            title='Confirm Password'
                            value={password2}
                            error={password2Error}
                            setValue={setPassword2}
                            setError={setPassword2Error}
                            secureTextEntry={true}
                        />
                        {loading ? (
                            <ActivityIndicator size="large" color={COLORS.primaryBlackHex} />
                        ) : (
                            <Button title='Sign Up' onPress={onSignUp} />
                        )}
                        <Text style={styles.loginText}>
                            Already have an account?
                            <Text
                                style={styles.loginLink}
                                onPress={() => navigation.navigate('Login')}
                            >
                                Log In
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
    },
    loginText: {
        textAlign: 'center',
        marginTop: 40,
    },
    loginLink: {
        color: 'blue',
    },
});

export default SignupScreen;
