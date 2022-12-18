import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Modal from 'react-native-modal'
import CustomButton from '../CustomButton'
import * as Animatable from 'react-native-animatable';
import { color } from '../../helpers/color/Color_Constant';

export default class SelectLocation extends Component {
    render() {
        const { isVisible, setVisible, bookOrder } = this.props
        return (
            <Modal
                isVisible={isVisible}
                onBackButtonPress={() => setVisible(false)}
                onBackdropPress={() => { setVisible(false) }}
                onSwipeCancel={() => setVisible(true)}
                ref={ref => (this.addAddressRef = ref)}
                hasBackdrop={true}
                backdropOpacity={0.3}>
                {/* <Animatable.View
                    animation={'fadeIn'}
                    duration={2000}> */}
                    <View style={{ borderRadius: 20, paddingVertical: 25, backgroundColor: 'white' }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, color: 'black' }}>Select Location</Text>
                        </View>
                        <View style={{paddingHorizontal: 50}}>
                            <CustomButton
                                text='Get Current Location'
                                bgColor={color.secondaryColor}
                                textColor={color.primaryColor}
                                paddingHorizontal={12}
                                paddingVertical={10}
                                borderRadius={100}
                                elevation={5}
                                onPress={() => bookOrder()}
                            />
                        </View>

                    </View>
                {/* </Animatable.View> */}
            </Modal>
        )
    }
}