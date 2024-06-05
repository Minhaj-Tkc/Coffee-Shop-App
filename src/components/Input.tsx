import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputProps {
    title: string;
    value: string;
    error: string;
    setValue: (value: string) => void;
    setError: (error: string) => void;
    secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ title, value, error, setValue, setError, secureTextEntry = false }) => {
    return (
        <View>
            <Text style={[styles.label, { color: error ? '#ff5555' : '#70747a' }]}>
                {error ? error : title}
            </Text>
            <TextInput
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={(text) => {
                    setValue(text);
                    if (error) {
                        setError('');
                    }
                }}
                secureTextEntry={secureTextEntry}
                style={[
                    styles.input,
                    { borderColor: error ? '#ff5555' : 'transparent' }
                ]}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginVertical: 6,
        paddingLeft: 16,
    },
    input: {
        backgroundColor: '#e1e2e4',
        borderWidth: 1,
        borderRadius: 26,
        height: 52,
        paddingHorizontal: 16,
        fontSize: 16,
    },
});

export default Input;
