import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Alert, Modal, ScrollView, Pressable, TextInput, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';


export type PostProps = {
    id: string,
    title: string;
    des: string;
    date: string,
    time: string,
    creator: string
};

export function PostView({
    id,
    title,
    des,
    date,
    time,
    creator
}: PostProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(title);
    const [email, setEmail] = useState<string>(des);
    const [imgage, setImage] = useState<string>(des);


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://192.168.0.127:3000/users?username=${creator}`); // Replace with your API URL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setImage(data.img);
            } catch (err) {
                console.error(err)
            }
        };

        fetchImage();
    }, [creator]);

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

    };


    return (
        <>
            <GestureHandlerRootView>
                <Swipeable
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                    onSwipeableLeftOpen={handleSwipeEdit}
                    onSwipeableRightOpen={handleSwipeDelete}
                >
                    <Pressable
                        style={[
                            styles.container,
                            { backgroundColor: "#aaacad" },
                        ]}
                        id={id}>
                        <View style={styles.info}>
                            <Image
                                style={styles.img}
                                source={{
                                    uri: imgage,
                                }}
                            />
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.des}>{des}</Text>
                        </View>
                    </Pressable>
                </Swipeable>
            </GestureHandlerRootView >

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        borderRadius: 15,
        padding: 25,
        margin: 5,
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: "700",
    },
    des: {
        fontSize: 16,
        color: "#454747",
        fontWeight: "500",
    },
    img: {
        width: 125,
        height: 125,
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
