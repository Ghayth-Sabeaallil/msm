import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, Pressable, Modal, Alert, TextInput, View, ScrollView, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import data from '../lib/db.json';

export function PostModal() {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [des, setDes] = useState<string>("");

    const handleNameChange = (input: string) => {
        setTitle(input);
    }
    const handleEmailChange = (input: string) => {
        setDes(input);
    }
    const eventHandlerFunction = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        fetch('http://192.168.0.127:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: des,
                creator: data.session.user,
                date: `${yyyy}-${mm}-${dd}`,
                time: `${hours}:${minutes}`,
            }),
        })
        setTitle("");
        setDes("");
        setModalVisible(!modalVisible);
    }

    return (
        <>
            {data.session.user.length != 0 && <Pressable style={styles.circle} onPress={() => setModalVisible(true)}>
                <IconSymbol size={28} name="paperplane.fill" color={"black"} />
            </Pressable>}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <ScrollView>
                    <View style={styles.modalView}>
                        <Text style={styles.btnTxt}>Create a Post</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={handleNameChange} // handle text changes
                            placeholder="Title"
                            placeholderTextColor="#000"
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.des}
                            value={des}
                            onChangeText={handleEmailChange} // handle text changes
                            placeholder="Description"
                            placeholderTextColor="#000"
                        />

                        <View style={styles.row}>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => {
                                    eventHandlerFunction();
                                }}>
                                <Text style={styles.btnTxt}>Create</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.btnTxt}>Exit</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    circle: {
        width: 60,
        height: 60,
        backgroundColor: "lightgrey",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 10,
        top: "95%",
        left: "85%",
    },
    circleTxt: {
        color: "balck",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 32,
    },
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
    input: {
        height: 45,
        width: "70%",
        borderColor: 'black',
        borderWidth: 1,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        paddingLeft: 8,
        marginBottom: 10,
        color: 'black',
        gap: 5,
    },
    des: {
        height: "60%",
        width: "70%",
        borderColor: 'black',
        borderWidth: 1,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        paddingLeft: 8,
        marginBottom: 10,
        color: 'black',
        gap: 5,
        padding: 10
    },
    button: {
        width: "60%",
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
