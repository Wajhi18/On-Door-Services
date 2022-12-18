import Snackbar from "react-native-snackbar";

class AlertFunction {
    Alert = (message) => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'OK',
              textColor: 'green',
              onPress: () => { /* Do something. */ },
            },
          });
          return;
    }
}

const alertFunction = new AlertFunction()
export default alertFunction