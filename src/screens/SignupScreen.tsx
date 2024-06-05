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
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS, FONTFAMILY } from "../theme/theme";

interface SignUpScreenProps {
    navigation: any;
}

const SignupScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [password1Error, setPassword1Error] = useState<string>('');
    const [password2Error, setPassword2Error] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onSignUp = () => {
        // Reset previous errors
        setUsernameError('');
        setFirstNameError('');
        setLastNameError('');
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

        // Log validation success
        console.log('Validation passed:', { username, firstName, lastName, password1, password2 });
        navigation.navigate('Tab')
        
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
                            title='Password'
                            value={password1}
                            error={password1Error}
                            setValue={setPassword1}
                            setError={setPassword1Error}
                            secureTextEntry={true}
                        />
                        <Input
                            title='Retype Password'
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
                        <Text style={styles.signInText}>
                            Already have an account?
                            <Text
                                style={styles.signInLink}
                                onPress={() => navigation.goBack()}
                            >
                                Sign In
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
        paddingHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 36,
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.secondaryDarkGreyHex,
    },
    signInText: {
        textAlign: 'center',
        marginTop: 40,
    },
    signInLink: {
        color: 'blue',
    },
});

export default SignupScreen;
