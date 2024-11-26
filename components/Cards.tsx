import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert, Modal, ScrollView, Pressable, TextInput } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';


export type CardsProps = {
    img: string;
    name: string;
    emails: string,
};

export function Cards({
    img,
    name,
    emails
}: CardsProps) {
    const lastNumber: number = Number(img.split('/').pop());
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(name);
    const [random, setRandom] = useState<number>(lastNumber);
    const [email, setEmail] = useState<string>(emails);
    const renderLeftActions = () => (
        <View style={[styles.action, { backgroundColor: 'green' }]}>
            <Text style={styles.actionText}>Edit</Text>
        </View>
    );

    // Right action renderer
    const renderRightActions = () => (
        <View style={[styles.action, { backgroundColor: 'red' }]}>
            <Text style={styles.actionText}>Delete</Text>
        </View>
    );

    // Handle swipe actions
    const handleSwipeEdit = () => {
        setModalVisible(true);
    };
    const handleNameChange = (input: string) => {
        setUsername(input);
    }
    const handleEmailChange = (input: string) => {
        setEmail(input);
    }
    const handleSwipeDelete = async () => {
        try {
            const response = await fetch(`http://192.168.0.127:3000/users?username=${name}`);
            const users = await response.json();
            for (const user of users) {
                fetch(`http://192.168.0.127:3000/users/${user.id}`, { method: 'DELETE' });
            }
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };
    const getRandomNumber = () => {
        setRandom(Math.floor(Math.random() * 100) + 1);
    }

    const eventHandlerFunction = async () => {
        const response = await fetch(`http://192.168.0.127:3000/users?username=${name}`);
        const users = await response.json();
        for (const user of users) {
            fetch(`http://192.168.0.127:3000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    img: `https://avatar.iran.liara.run/public/${random}`,
                }),
            })
        }

        setModalVisible(!modalVisible);
    }
    return (
        <>
            <GestureHandlerRootView>
                <Swipeable
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                    onSwipeableLeftOpen={handleSwipeEdit}
                    onSwipeableRightOpen={handleSwipeDelete}
                >
                    <View style={styles.container}>
                        <Image
                            style={styles.img}
                            source={{
                                uri: img,
                            }}
                        />
                        <View style={styles.info}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.email}>{emails}</Text>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView >
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
                        <Text style={styles.btnTxt}>Edit an account</Text>
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
                            style={styles.imgs}
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
                                <Text style={styles.btnTxt}>Edit</Text>
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
    action: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: 80,
        height: "88%",
        borderRadius: 15,

    },
    actionText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    imgs: {
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
