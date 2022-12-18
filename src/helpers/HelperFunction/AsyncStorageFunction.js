import AsyncStorage from "@react-native-async-storage/async-storage"
import { navigate } from "../color/navigate"

class AsyncStorageFunction {
    setCreditialToAsyncStorage = async (token, userData, userRole) => {
        try {
            await AsyncStorage.setItem('@userToken', token)
            await AsyncStorage.setItem('@userData', userData)
            await AsyncStorage.setItem('@userRole', userRole)
            return
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    removeCreditialFromAsyncStorage = async() => {
        await AsyncStorage.clear();
    }
}
const asyncStorge = new AsyncStorageFunction()
export default asyncStorge