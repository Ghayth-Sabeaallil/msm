import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, Pressable, Modal, Alert, TextInput, View, ScrollView, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';


export function EditModal() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}>
                <ScrollView>
                    <View style={styles.modalView}>
                        <Text style={styles.btnTxt}>Create an account</Text>
                        <Pressable
                            style={[styles.button]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.btnTxt}>Exit</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: '#efe9e9',
        display: "flex",
        flexDirection: "column",
        margin: 20,
        padding: 15,
        marginTop: "25%",
        gap: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    button: {
        width: "50%",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "orange",
    },
    btnTxt: {
        color: "balck",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
});
