
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    FlatList
} from 'react-native';
import * as Const from '../constant/Const'
import Ionicons from 'react-native-vector-icons/Ionicons'
const { height, width } = Dimensions.get("window");
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database'
import uuid from 'react-native-uuid'
export default function Search({ navigation }) {
    const [searchkey, setSearchkey] = useState("");
    const [isloading, setIsloading] = useState(true)
    const DataUser = useSelector(state => state.userData)
    const [allUser, setAllUser] = useState([])
    const [allUserBackup, setAllUserBackup] = useState([])

    console.log(DataUser.id)
    const getAlluser = () => {
        setIsloading(true)
        database()
            .ref('users/')
            .once('value')
            .then(snapshot => {
                let arr = Object.values(snapshot.val()).filter((it) => it.id != DataUser.id)
                setAllUser(arr)
                setAllUserBackup(arr)
            })
        setIsloading(false)
    }
    useEffect(() => {
        getAlluser();
        getChatList();
    }, []);

    search = (value) => {
        setAllUser(allUserBackup.filter((it) => it.name.match(value)))
    }
    const createChatList = (data, index) => {
        database()
            .ref('/chatlist/' + DataUser.id + "/" + data.id)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() == null) {
                    let roomId = uuid.v4()
                    let myData = {
                        roomId,
                        id: DataUser.id,
                        name: DataUser.name,
                        image: DataUser.image,
                        email: DataUser.email,
                        about: DataUser.about,
                        lastMsg: ""
                    }

                    database()
                        .ref('/chatlist/' + data.id + "/" + DataUser.id)
                        .update(myData)
                        .then(() => console.log('data update'));

                    delete data["password"]
                    // data.lastMsg = "";
                    let arr_data = [...allUser]
                    arr_data[index].lastMsg = "";
                    setAllUser(arr_data);

                    data.roomId = roomId;
                    database().
                        ref('/chatlist/' + DataUser.id + "/" + data.id)
                        .update(data)
                        .then(() => console.log('data update'));

                    navigation.navigate("Chat", {
                        data: data
                    })
                } else {
                    navigation.navigate("Chat", {
                        data: snapshot.val()
                    })
                }



            })
    }
    const getChatList = async () => {
        database()
            .ref('/chatlist/' + DataUser?.id)
            .on('value', snapshot => {
                console.log('userdata:', snapshot.val());
            })
    }
    return (
        <>
            <StatusBar backgroundColor={Const.first_color} />

            {isloading ? <View>

                <ActivityIndicator size={15} color={Const.first_color}>

                </ActivityIndicator>
            </View>

                : (

                    <View style={styles.Container}>

                        <View style={styles.header}>

                            <Ionicons name="md-search-outline" style={styles.icon} />
                            <TextInput
                                style={styles.textinput}
                                placeholder="Search by name..."
                                placeholderTextColor="#aaa"
                                value={searchkey}
                                onChangeText={(value) => {

                                    setSearchkey(value)
                                    search(value)
                                }}

                            >

                            </TextInput>
                        </View>

                        <ScrollView style={styles.scrollView}

                            showsHorizontalScrollIndicator={false}
                            endFillColor="#000"
                            overScrollMode="never"

                        >
                            <View style={styles.Container2}>
                                <ScrollView horizontal={true} style={{ width: "100%" }}>
                                    <FlatList
                                        data={allUser}
                                        renderItem={
                                            ({ item, index }) => (
                                                <TouchableOpacity style={styles.box}
                                                    onPress={() => {
                                                        createChatList(item, index)
                                                    }}
                                                >
                                                    <Image source={{ uri: item.image }}
                                                        style={styles.image}

                                                    >

                                                    </Image>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={styles.name}>{item.name}</Text>
                                                        <Text style={styles.message}>{item.about}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    >

                                    </FlatList>
                                </ScrollView>
                            </View>
                        </ScrollView>

                    </View>
                )
            }
        </>
    )
}



const styles = StyleSheet.create({
     Container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
    }, header: {
        height: height * .09,
        width: width,
        paddingHorizontal: width * .02,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
        margin:1
    }, icon: {
        color: Const.first_color,
        fontSize: 20,
        marginHorizontal: 5,
        marginLeft: width * .04
    }, textinput: {
        height: height * .08,
        width: width * .8,
        backgroundColor: "#fff",
        marginLeft: width * .01,
        fontSize: 13,
        fontFamily: Const.font_family,
        color:Const.first_color

    },
    scrollView: {
        marginHorizontal: 20,
        backgroundColor: "#fff",
        width: width
    },
    Container2: {

    },
    box: {
        height: height * .11,
        width: width,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: width * .04,
        borderColor: "#f00",

    },
    image: {
        height: height * .082,
        width: width * .16,
        borderRadius: 100
    },
    name: {
        fontSize: 15,
        color: "#000",
        fontFamily: Const.font_family,

    },
    message: {
        fontSize: 12,
        color: "#aaa",
        fontFamily: Const.font_family,

    },

});


