import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert, Modal, ScrollView, Pressable, TextInput, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IconSymbol } from './ui/IconSymbol';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import data from '../lib/db.json';


export type CommentModalProps = {
    id: string,
    title: string;
    des: string;
    date: string,
    time: string,
    creator: string,
    img: string | undefined,
    session: string,
    likes: string[],
    comments: string[]
};

export function PostView({
    id,

}: CommentModalProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const post = data.posts.find(post => post.id === id);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <ScrollView>
                    <View style={styles.modalViewComment}>
                        <Text style={styles.btnTxt}>Comments</Text>
                        {post?.comments.map(com => (
                            <Pressable style={styles.container} id={id}>
                                <View style={styles.info}>
                                    <Text style={styles.viewUser}>{com.creator}</Text>
                                    <Text style={styles.viewDate}>{com.comment}</Text>
                                </View>
                            </Pressable>
                        ))}
                        <View style={styles.row}>
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
        backgroundColor: "#aaacad",
        flexDirection: "column",
        borderRadius: 15,
        padding: 10,
        gap: 5,
        margin: 5,
    },
    info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },


    des: {
        height: "30%",
        width: "70%",
        borderColor: 'black',
        borderWidth: 1,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        paddingLeft: 8,
        color: 'black',
        gap: 5,
        textAlign: 'left', // Aligns text to the left
        textAlignVertical: 'top',
    },
    infoView: {
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
        backgroundColor: "#fafafa"
    },
    like: {
        backgroundColor: "#5f90f8",
        color: "white",
        padding: 3,
        borderRadius: 5,
        textAlign: "center",

    },
    comment: {
        backgroundColor: "#4aced3",
        color: "white",
        padding: 3,
        borderRadius: 5,

    },
    infoCol: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
    },
    viewUser: {
        fontSize: 20,
        fontWeight: "700",
    },
    viewDate: {
        fontSize: 12,
        color: "#454747",
        fontWeight: "500",
    },
    viewTitle: {
        fontSize: 18,
        fontWeight: "700",
    },
    viewDes: {
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
        height: "94%",
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
        width: 65,
        height: 65,
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
    modalViewComment: {
        backgroundColor: '#efe9e9',
        display: "flex",
        flexDirection: "column",
        margin: 20,
        padding: 15,
        marginTop: "25%",
        gap: 10,
        borderRadius: 10,
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
