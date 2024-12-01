import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert, Modal, ScrollView, Pressable, TextInput, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IconSymbol } from './ui/IconSymbol';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import data from '../lib/db.json';


export type PostProps = {
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
    title,
    des,
    date,
    time,
    creator,
    img,
    session,
    likes,
    comments
}: PostProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [titleState, setTitleState] = useState<string>(title);
    const [desState, setDesState] = useState<string>(des);
    const [commentModalVisible, setCommentModalVisible] = useState<boolean>(false);
    const [commentModalViewVisible, setCommentModalViewVisible] = useState<boolean>(false);

    const [commentState, setCommentState] = useState<string>("");



    const renderLeftActions = () => (
        <View style={[styles.action, { backgroundColor: '#70d74c' }]}>
            {creator === session ? <IconSymbol size={28} name="medal" /> : <IconSymbol size={28} name="cone.fill" />}
        </View>
    );

    // Right action renderer
    const renderRightActions = () => (
        <View style={[styles.action, { backgroundColor: '#f56767' }]}>
            {creator === session ? <IconSymbol size={28} name="delete.left" /> : <IconSymbol size={28} name="text.redaction" />}
        </View>
    );

    // Handle swipe actions
    const handleSwipeLeft = () => {
        if (session === creator) {
            setModalVisible(true);
        }
        else {
            setCommentModalVisible(true);
        }

    };
    const handleTitleChange = (input: string) => {
        setTitleState(input);
    }
    const handleCommentChange = (input: string) => {
        setCommentState(input);
    }
    const handleDesChange = (input: string) => {
        setDesState(input);
    }
    const handleSwipeRight = async () => {
        if (session === creator) {
            try {
                fetch(`http://192.168.1.192:3000/posts/${id}`, { method: 'DELETE' });
            } catch (error) {
                console.error('Error deleting users:', error);
            }
        } else {
            const response = await fetch(`http://192.168.1.192:3000/posts/${id}`);
            const user = await response.json();
            if (!user.likes.includes(session)) {
                const updateLikes = [...user.likes, session];
                fetch(`http://192.168.1.192:3000/posts/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ likes: updateLikes })
                });
            }
        }
    };

    const eventHandlerFunction = async () => {
        if (session === creator) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const dd = String(today.getDate()).padStart(2, '0');
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            fetch(`http://192.168.1.192:3000/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: titleState,
                    description: desState,
                    date: `${yyyy}-${mm}-${dd}`,
                    time: `${hours}:${minutes}`,
                }),
            })
            setModalVisible(!modalVisible);
        }
        else {
            const response = await fetch(`http://192.168.1.192:3000/posts/${id}`);
            const user = await response.json();
            const updateComment = [...user.comments, { comment: commentState, creator: session }];
            fetch(`http://192.168.1.192:3000/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comments: updateComment })
            });
            setCommentState("");
            setCommentModalVisible(!commentModalVisible);
        }
    }

    const post = data.posts.find(post => post.id === id);

    return (
        <>
            <GestureHandlerRootView>
                <Swipeable
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                    onSwipeableLeftOpen={handleSwipeLeft}
                    onSwipeableRightOpen={handleSwipeRight}
                >
                    <Pressable
                        style={styles.container}
                        id={id}
                        onPress={() => {
                            setCommentModalViewVisible(!modalVisible);
                        }}>
                        <View style={styles.info}>
                            <Image
                                style={styles.imgs}
                                source={{
                                    uri: img,
                                }}
                            />
                            <View>
                                <Text style={styles.viewUser}>{creator}</Text>
                                <Text style={styles.viewDate}>{date} - {time}</Text>
                            </View>
                            <View>
                                <Text style={[styles.like]}>{likes.length} Likes</Text>
                                <Text style={[styles.comment]}>{comments.length} Comments</Text>

                            </View>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.viewTitle}>{titleState}</Text>
                            <Text style={styles.viewDes}>{desState}</Text>

                        </View>
                    </Pressable>
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
                        <Text style={styles.btnTxt}>Edit the post</Text>
                        <TextInput
                            style={styles.input}
                            value={titleState}
                            onChangeText={handleTitleChange} // handle text changes
                            placeholder="Title"
                            placeholderTextColor="#000"
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.des}
                            value={desState}
                            onChangeText={handleDesChange} // handle text changes
                            placeholder="Description"
                            placeholderTextColor="#000"
                        />

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={commentModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!commentModalVisible);
                }}>
                <ScrollView>
                    <View style={styles.modalView}>
                        <Text style={styles.btnTxt}>Comment</Text>
                        <TextInput
                            style={styles.input}
                            value={commentState}
                            onChangeText={handleCommentChange} // handle text changes
                            placeholder="Comment"
                            placeholderTextColor="#000"
                        />

                        <View style={styles.row}>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => {
                                    eventHandlerFunction();
                                }}>
                                <Text style={styles.btnTxt}>Post</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => {
                                    setCommentModalVisible(!commentModalVisible);
                                }}>
                                <Text style={styles.btnTxt}>Exit</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={commentModalViewVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!commentModalVisible);
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
                                    setCommentModalViewVisible(!commentModalViewVisible);
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
