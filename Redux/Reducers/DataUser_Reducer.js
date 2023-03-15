import { getuser, setuser } from "../Actions/Action";
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    userData: {}
};
getuserdata = async () => {
    let userData = await AsyncStorage.getItem("userData");
    if (userData == null) {
        userData = "{}"
    }
    userData = JSON.parse(userData)

    initialState.userData = userData
}
getuserdata()
const DataUser_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case setuser:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state;
    }

}
export default DataUser_Reducer;