import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    StatusBar
} from "react-native";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS } from "../theme/theme";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Function to handle login
    const onSignIn = () => {
        // Reset previous errors
        setUsernameError('');
        setPasswordError('');

        // Validation checks
        const failUsername = !username;
        if (failUsername) {
            setUsernameError('Username not provided');
        }
        const failPassword = !password;
        if (failPassword) {
            setPasswordError('Password not provided');
        }
        if (failUsername || failPassword) {
            console.log('Validation failed', { failUsername, failPassword });
            return;
        }

        // Log validation success
        console.log('Validation passed:', { username, password });

        navigation.navigate('Tab')

        // Normally here you would send the login request to the backend
        // but this code has been removed as per your request.
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoidingContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <Title text='The Coffee Shop' color='#202020' />

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

                        <Button
                            title='Sign In'
                            onPress={onSignIn}
                        />

                        <Text style={styles.signUpText}>
                            Don't have an account? <Text
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
}

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
    signUpText: {
        textAlign: 'center',
        marginTop: 40,
    },
    signUpLink: {
        color: 'blue',
    },
});

export default LoginScreen;
