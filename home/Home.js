
import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import * as Const from '../constant/Const'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import database from '@react-native-firebase/database'
import { useSelector } from 'react-redux';
const { height, width } = Dimensions.get("window");
import uuid from 'react-native-uuid'
import InstaStory from 'react-native-insta-story';
export default function Home({ navigation }) {
    const [allUser, setAllUser] = useState([])
    const DataUser = useSelector(state => state.userData)

    const [isloading, setIsloading] = useState(true)
    const getAlluser = () => {
        setIsloading(true)
        database()
            .ref('/users/')
            .once('value')
            .then(snapshot => {
                let arr = Object.values(snapshot.val()).filter((it) => it.id != DataUser.id)
                setAllUser(arr)

            })
        setIsloading(false)

    }
    useEffect(() => {
        getAlluser();
        getChatlist()

    }, []);
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
    const [chatlist, setChatlist] = useState([]);


    const getChatlist = async () => {
        database()
            .ref('/chatlist/' + DataUser?.id)
            .on('value', snapshot => {
                console.log('userdata:', snapshot.val());
                if (snapshot.val() != null)
                    setChatlist(Object.values(snapshot.val()))
            })
    }
    const data = [
        {
            user_id: 1,
            user_image: 'https://i.pinimg.com/564x/8a/f4/11/8af411f0f44ee26050d3c9c2ed96022b.jpg',
            user_name: "Reham Gamal",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://i.pinimg.com/564x/8a/f4/11/8af411f0f44ee26050d3c9c2ed96022b.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                }, {
                    story_id: 1,
                    story_image: "https://i.pinimg.com/564x/26/ca/23/26ca239482b1879c4455ad2ab7254f5f.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },


            ]
        },
        {
            user_id: 2,
            user_image: 'https://i.pinimg.com/564x/8f/a7/cd/8fa7cd28afff93e45b664f19b12f5864.jpg',
            user_name: "Nour Ahmed",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://i.pinimg.com/564x/8f/a7/cd/8fa7cd28afff93e45b664f19b12f5864.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://i.pinimg.com/564x/fb/a1/f2/fba1f288d500b251e862f190fc40776c.jpg",
                }, {
                    story_id: 3,
                    story_image: "https://i.pinimg.com/564x/e2/1e/1c/e21e1cd637537fc782387803a29fe408.jpg",
                }





            ]
        },
        {
            user_id: 3,
            user_image: 'https://i.pinimg.com/564x/d1/5d/26/d15d26787dc598754553042aa208aea3.jpg',
            user_name: "Norhan osama",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://i.pinimg.com/236x/9d/c2/dc/9dc2dc428f560a6a85a3a023f3a6a46b.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://i.pinimg.com/564x/d1/5d/26/d15d26787dc598754553042aa208aea3.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }, {
                    story_id: 3,
                    story_image: "https://i.pinimg.com/564x/1b/3d/b9/1b3db92294a4aa08940988229d654683.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }


            ]
        },
        {
            user_id: 4,
            user_image: 'https://i.pinimg.com/236x/29/cc/95/29cc9545e0b59e501ae4b07937e95648.jpg',
            user_name: "Hager Ahmed",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://i.pinimg.com/564x/c0/fd/d7/c0fdd7ed027b8abcaf0d69e8076d4736.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://i.pinimg.com/564x/e7/86/72/e786722579dfeb3b307b7f53bef0e7b0.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }, {
                    story_id: 3,
                    story_image: "https://i.pinimg.com/564x/cf/de/ad/cfdead0726f59dd39f5df064e26afab6.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }

            ]
        }, {
            user_id: 5,
            user_image: 'https://i.pinimg.com/564x/6d/56/bd/6d56bdb778b20016771277a842abbd49.jpg',
            user_name: "Mayar Ahmed",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://i.pinimg.com/564x/6d/56/bd/6d56bdb778b20016771277a842abbd49.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://i.pinimg.com/564x/bc/ff/17/bcff17293500970b0555a81748c0bd9d.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }, {
                    story_id: 3,
                    story_image: "https://i.pinimg.com/564x/71/b0/3b/71b03ba7848d75f5d366924109ad10db.jpg",
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }

            ]
        },
    ];

    return (
        <>
            <StatusBar backgroundColor={Const.first_color} />

            {
                isloading ?
                    <ActivityIndicator size={15} color={Const.first_color}>

                    </ActivityIndicator>
                    :

                    <View style={styles.Container}>
                        <View style={styles.header}>
                            <Text style={styles.textHeader}>
                                Chato
                            </Text>
                            <Ionicons name="notifications" style={styles.icon} />
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Profile")
                                }
                            >
                                <Image source={{ uri: DataUser.image }}
                                    style={styles.myimage}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* <View
                            style={styles.header2}
                        >
                            <ScrollView horizontal={true}>
                                {
                                    listimage.map((item, index) => (
                                        <TouchableOpacity>
                                            <LinearGradient
                                                colors={['#CA1D7E', '#E35157', '#F2703F']}
                                                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                                style={styles.linaer}>
                                                <Image source={{ uri: item.uri }}
                                                    style={styles.imagestories} />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        </View> */}
                        <InstaStory data={data}
                            duration={10}
                            onStart={item => console.log(item)}
                            onClose={item => console.log('close: ', item)}
                            customSwipeUpComponent={<View>
                                <Text>Swipe</Text>
                            </View>}
                            style={{ marginVertical: height * .02, height: height * .13 }}
                        />


                        <ScrollView style={styles.scrollView}

                            showsHorizontalScrollIndicator={false}
                            endFillColor="#000"
                            overScrollMode="never"

                        >
                            <View style={styles.Container2}>
                                <ScrollView horizontal={true} style={{ width: "100%" }}>
                                    <FlatList
                                        data={chatlist}
                                        renderItem={
                                            ({ item, index }) => (
                                                <TouchableOpacity style={styles.box}
                                                    onPress={() =>
                                                        createChatList(item, index)
                                                    }
                                                >
                                                    <Image source={{ uri: item.image }}
                                                        style={styles.image}
                                                    >

                                                    </Image>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={styles.name}>{item.name}</Text>
                                                        <Text style={styles.message}>{item.lastMsg}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }

                                    >

                                    </FlatList>
                                </ScrollView>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                navigation.navigate("Search")
                            }}
                        >
                            <FontAwesome5
                                name="users"
                                style={styles.iconbu}
                            />
                        </TouchableOpacity>
                    </View>

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
        elevation: 5
    }, header2: {
        height: height * .1,
        width: width,
        paddingHorizontal: width * .02,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: width * .04,
        marginTop: height * .02


    },
    linaer: {
        width: width * .155,
        height: height * .077,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginHorizontal: 5
    },

    imagestories: {
        width: width * .14,
        height: height * .07,
        borderRadius: 100,
        alignSelf: 'center',
        borderColor: '#fff',
        borderWidth: 1,


    }, textHeader: {
        fontSize: 20,
        color: Const.first_color,
        fontFamily: Const.font_family,
        marginRight: width * .48,
        marginLeft: width * .03
    }, icon: {
        color: Const.first_color,
        fontSize: 20,
        marginHorizontal: width * .06
    },
    myimage: {
        height: height * .05,
        width: width * .1,
        borderRadius: 50
    },
    scrollView: {
        marginHorizontal: 20,
        backgroundColor: "#fff",
        width: width
    },
    Container2: {
        backgroundColor: "#fff"
    },
    box: {
        height: height * .1,
        width: width,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: width * .04,

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
    button: {
        height: height * .07,
        width: width * .14,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        borderRadius: 50,
        backgroundColor: Const.first_color,
        position: "absolute",
        bottom: height * .04,
        right: width * .05,
    },
    iconbu: {
        fontSize: 15,
        color: "#fff"
    }
});


