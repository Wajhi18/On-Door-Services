import {USER_EMAIL, USER_PASSWORD} from '../Constant/Contants'

const initialState = {
  email: '',
  password: '',
}

const UserLogin = (state = initialState, action) => {
  
  switch (action.type) {
    case USER_EMAIL:
      console.log('Reducer: ', action.data)
      return { ...state, name: action.data }
    case USER_PASSWORD:
      return { ...state, password: action.data }
    default:
      return state
  }
}
export default UserLogin