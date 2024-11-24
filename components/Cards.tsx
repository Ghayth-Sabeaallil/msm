import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';


export type CardsProps = {
    img?: string;
    name?: string;
};

export function Cards({
    img,
    name,
}: CardsProps) {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <></>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        backgroundColor: "pink",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: 10,
        top: "85%",
        left: 280,
    },
    circleTxt: {
        color: "balck",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 32,
    },
});
