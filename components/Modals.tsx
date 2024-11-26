import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, Pressable, Modal, Alert, TextInput, View, ScrollView, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

export function Modals() {
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [random, setRandom] = useState<number>(1);
    const [email, setEmail] = useState<string>("");

    const handleNameChange = (input: string) => {
        setUsername(input);
    }
    const handleEmailChange = (input: string) => {
        setEmail(input);
    }
    const eventHandlerFunction = async () => {
        if (username.length != 0 && email.length != 0) {
            const response = await fetch(`http://192.168.0.127:3000/users?username=${username}`);
            const users = await response.json();
            if (users.length == 0) {
                fetch('http://192.168.0.127:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        img: `https://avatar.iran.liara.run/public/${random}`,
                    }),
                })
                setUsername("");
                setEmail("");
                getRandomNumber();
                setModalVisible(!modalVisible);
            }
            else {
                Alert.alert('Create error', 'This user is already exist', [
                    { text: 'OK' },
                ]);
            }
        }
        else {
            Alert.alert('Create error', 'Please fill all inputs', [
                { text: 'OK' },
            ]);
        }
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
                            onChangeText={handleEmailChange} // handle text changes
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
