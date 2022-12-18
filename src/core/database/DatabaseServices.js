import firestore from '@react-native-firebase/firestore';
import alertFunction from "../../helpers/HelperFunction/AlertFunction"

class DatabaseServices {
    getFirestorData(email, password){
        firestore()
          .collection('Users').where('email', '==', email).where('password', '==', password.toString())
          .get()
          .then(querySnapshot => {
    
            querySnapshot.forEach(documentSnapshot => {
                // alert(JSON.stringify(documentSnapshot.id))
                return documentSnapshot
            //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().name)
            //   this.setState({ authUserID: documentSnapshot.id })
            //   this.setState({ authUserName: documentSnapshot.data().name })
            })
    
            // if (querySnapshot.size == 0) {
            //   alertFunction.Alert('please enter valid credentials')
            //   console.log('if: ', querySnapshot.size)
            // } else {
    
            //   this.storeData()
    
            //   console.log('Total users: ', querySnapshot.size);
            // }
          }).catch(err =>
            alertFunction.Alert('No Record Foud')
          )
      }
}

const databaseService = new DatabaseServices()
export default databaseService