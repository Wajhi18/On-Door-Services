import UserLogin from "../Reducers/UserLogin";

import { combineReducers } from "redux";

const CombineReducers = combineReducers({
    userLogin: UserLogin,
})
export default CombineReducers