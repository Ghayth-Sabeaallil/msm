import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, Pressable, Modal, Alert, TextInput, View, ScrollView, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface Item {
    id: number
    username: string;
    email: string;
}

export function Modals() {
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [random, setRandom] = useState<number>(1);

    const [email, setEmail] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);

    const eventRemoveFunction = (id: number) => {
        setItems((itemList) => itemList.filter((item) => item.id !== id));
    };
    const handleNameChange = (input: string) => {
        setUsername(input);
    }
    const handleAgeChange = (input: string) => {
        setEmail(input);
    }
    const eventHandlerFunction = () => {
        const newItem = { id: items.length + 1, username: username, email: email };
        setItems([...items, newItem]);
        setUsername("");
        setEmail("");
    }
    const getRandomNumber = () => {
        setRandom(Math.floor(Math.random() * 100) + 1);
    }
    return (
        <>
            <Pressable style={styles.circle} onPress={() => setModalVisible(true)}>
                <IconSymbol size={28} name="person.2" color={"black"} />
            </Pressable>

            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <ScrollView>
                    <View style={styles.modalView}>
                        <Text style={styles.btnTxt}>Create an account</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={handleNameChange} // handle text changes
                            placeholder="Username"
                            placeholderTextColor="#000"
                        />
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={handleNameChange} // handle text changes
                            placeholder="Email"
                            placeholderTextColor="#000"
                        />
                        <Image
                            style={styles.img}
                            source={{
                                uri: `https://avatar.iran.liara.run/public/${random}`,
                            }}
                        />
                        <Pressable
                            style={[styles.button]}
                            onPress={() => {
                                getRandomNumber();
                            }}>
                            <Text style={styles.btnTxt}>Random Image</Text>
                        </Pressable>
                        <View style={styles.row}>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => {
                                    eventHandlerFunction();
                                    setModalVisible(!modalVisible);

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
    img: {
        width: 125,
        height: 125,
    },
    circle: {
        width: 70,
        height: 70,
        backgroundColor: "lightgrey",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: 10,
        top: "85%",
        left: "80%",
    },
    circleTxt: {
        color: "balck",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 32,
    },
    modal: {
        flex: 15,
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
        gap: 5
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
