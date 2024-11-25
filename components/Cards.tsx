import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


export type CardsProps = {
    img: string;
    name: string;
    email: string,
};

export function Cards({
    img,
    name,
    email
}: CardsProps) {


    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={{
                        uri: img,
                    }}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        borderRadius: 15,
        backgroundColor: "#aaacad",
        padding: 5,
        margin: 5,
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    img: {
        width: 70,
        height: 70,
        borderColor: "black",
    },
    name: {
        fontSize: 16,
        fontWeight: "700",

    },
    email: {
        fontSize: 15,
        color: "#454747",
        fontWeight: "500",
    },
});
