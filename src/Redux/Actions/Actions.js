import { USER_EMAIL, USER_PASSWORD } from "../Constant/Contants"

const UserEmail =(email)=>{
    console.warn("UserEmail Action: ",email)
    return {
        type: USER_EMAIL,
        data: email
    }
}

const UserPassword =(password)=>{
    console.warn("UserPassword Action: ",password)
    return {
        type: USER_PASSWORD,
        data: password
    }
}

export{UserEmail, UserPassword}