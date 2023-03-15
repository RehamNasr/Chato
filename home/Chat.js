

import React, { useState, useContext, useRef, useEffect } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    Keyboard

} from 'react-native';
import * as Const from '../constant/Const'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const { height, width } = Dimensions.get("window");
import database from '@react-native-firebase/database'
import { useSelector } from 'react-redux';
import moment from 'moment'
export default function Chat({ route, navigation }) {
    const [msg, setMsg] = useState("")
    const [allchat, setAllchat] = useState([])

    const data = route.params.data
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)

    useEffect(() => {

        const onChildAdd =
            database()
                .ref('/messages/' + data.roomId)
                .on('child_added', snapshot => {
                    setAllchat((state) => [...state, snapshot.val()])
                })


        return () => database().ref('./messages' + data?.roomId).off('child_added', onChildAdd);
    }, [data.roomId])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardIsVisible(true)
            console.log("open")
        })
        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardIsVisible(false)
            console.log("close")
        })
    }, [])

    const DataUser = useSelector(state => state.userData)
    const sendmsg = () => {
        let msgData = {
            roomId: data.roomId,
            message: msg,
            from: DataUser?.id,
            to: data.id,
            sendTime: moment().format(),
            msgType: 'text'
        }

        if (msg.trim() == "") {
            ToastAndroid.show("Enter something....", ToastAndroid.SHORT)
            return false;
        }

        const newReference = database().ref('/messages/' + data.roomId).push();


        msgData.id = newReference.key;


        newReference.set(msgData)
            .then(() => {
                let chatlistupdate = {
                    lastMsg: msg,
                    sendTime: msgData.sendTime
                }
                setMsg('')
                database()
                    .ref('./chatlist/' + data?.id + '/' + DataUser?.id)
                    .update(chatlistupdate)
                    .then(() => setMsg(''))

                database()
                    .ref('/chatlist/' + DataUser?.id + '/' + data?.id)
                    .update(chatlistupdate)
                    .then(() => setMsg(''))

                setMsg('')


            });

    }


    return (
        <>

            {/* <KeyboardAwareScrollView > */}
            <View style={styles.Container}>
                <StatusBar backgroundColor={Const.first_color}></StatusBar>

                <View style={styles.headerbox}>
                    {/* <TouchableOpacity style={styles.backbutton}>
                        <SimpleLineIcons name="arrow-left" style={styles.back} />
                    </TouchableOpacity> */}
                    <View style={styles.row1}>
                        <Image style={styles.image}
                            source={{ uri: data.image }}
                        >
                        </Image>
                        <Text style={styles.header}>
                            {data.name}
                        </Text>
                        <TouchableOpacity style={styles.backbutton}>
                            <SimpleLineIcons name="phone" style={styles.back} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backbutton}>
                            <SimpleLineIcons name="options-vertical" style={styles.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.row1, width: width * .55, alignSelf: "flex-start", justifyContent: "space-around", flex: 1.2 }}>
                        <TouchableOpacity style={{ ...styles.button }}>
                            <Text style={styles.text}>Chat</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Files</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView horizontal={true} style={{ width: width, alignSelf: "center" }}>
                    <View style={styles.Container2}>
                        {/* message */}


                        <FlatList
                            data={allchat}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        ...styles.viewmessage,
                                        alignSelf: item.from != DataUser.id ? "flex-start" : "flex-end",
                                        backgroundColor: item.from == DataUser.id ? Const.first_color : "#e8e8e8"
                                    }}>
                                    <Text
                                        style={{
                                            ...styles.textmessage,
                                            color: item.from == DataUser.id ? "#e8e8e8" : Const.first_color
                                        }}

                                    >{item.message}</Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontFamily: Const.font_family,
                                            color: item.from == DataUser.id ? "#e8e8e8" : Const.first_color,
                                            alignSelf: "flex-end"
                                        }}
                                    >
                                        {moment(item.sendTime).format('LLL')}
                                    </Text>

                                </View>
                            )}
                        >

                        </FlatList>



                    </View>
                </ScrollView>

                <View style={{
                    height: height * .1,
                    width: width,
                    flexDirection: "row",
                    marginBottom: keyboardIsVisible ? height * .33 : 0,
                    marginVertical: 10
                }}>
                    <View style={styles.part1}>
                        <TextInput
                            placeholder={'Write Something for ' + data.name + "..."}
                            style={styles.textinput}
                            placeholderTextColor="#aaa"
                            value={msg}
                            autoFocus={true}
                            onChangeText={(value) => {
                                setMsg(value)
                            }}

                        />
                        <TouchableOpacity style={styles.galeery}>
                            <EvilIcons name="image" style={styles.galleryicon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonsend}
                        onPress={() => {
                            sendmsg()
                        }}

                    >
                        <FontAwesome name="send-o" style={{ ...styles.galleryicon, fontSize: 13 }} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* </KeyboardAwareScrollView> */}
        </>
    )
}



const styles = StyleSheet.create({
    Container: {
        height: height,
        width: width,
        backgroundColor: "#fff",
        // justifyContent:"space-around",
        alignItems: "center"
    },
    headerbox: {
        height: height * .19,
        width: width,
        backgroundColor: Const.first_color,
        alignItems: "center",
        paddingLeft: width * .04,
        // borderBottomEndRadius: 5,
        // borderBottomLeftRadius: 5
    }, row1: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

    },
    backbutton: {
        height: height * .07,
        width: width * .1,
        alignItems: "center",
        justifyContent: "center",
    },
    back: {
        fontSize: 12,
        color: "#fff"
    },
    header: {
        fontSize: 15,
        color: "#fff",
        width: width * .62,
        // fontFamily: "Almarai-Regular",
        fontFamily: Const.font_family,

    }, image: {
        height: height * .055,
        width: width * .11,
        borderRadius: 100,
        marginRight: width * .03
    },
    button: {
        height: height * .045,
        width: width * .26,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: Const.first_color
    }, text: {
        fontSize: 13,
        color: "#000",
        fontFamily: Const.font_family,

    },
    Container2: {
        height: height * .73,
        width: width,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: height * .02,
        paddingBottom: height * .03
    }, viewmessage: {
        backgroundColor: "#e8e8e8",
        // width: width * .7,
        // height: height * .06,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: height * .003,
        justifyContent: "center"

    },
    textmessage: {
        fontSize: 14,
        color: "#000",
        // width: width * .6,
        maxWidth: width * .75,
        fontFamily: Const.font_family,

    },
    part1: {
        width: width * .77,
        height: height * .06,
        backgroundColor: "#e8e8e8",
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        borderRadius: 10,
        marginLeft: width * .04
    },
    textinput: {
        height: height * .08,
        width: width * .63,
        fontSize: 12,
        fontFamily: Const.font_family,
        color: Const.first_color

    },
    galeery: {
        height: height * .09,
        width: width * .12,
        alignItems: "center",
        justifyContent: "center"
    }, galleryicon: {
        fontSize: 20,
        color: "#aaa"
    }, buttonsend: {
        height: height * .06,
        width: width * .12,
        backgroundColor: "#e8e8e8",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: width * .04
    }


});


