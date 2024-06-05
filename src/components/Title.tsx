import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONTFAMILY } from "../theme/theme";

interface TitleProps {
    text: string;
    color: string;
}

const Title: React.FC<TitleProps> = ({ text, color }) => {
    return (
        <Text style={[styles.title, { color }]}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: FONTFAMILY.LeckerliOne,
        marginBottom: 40,
    },
});

export default Title;
