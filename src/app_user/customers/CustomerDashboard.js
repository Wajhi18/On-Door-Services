import { Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Header from '../../reusable/Header'
import ImageLinks from '../../helpers/images/ImagesConstant'
import { navigate } from '../../helpers/color/navigate'
import { color } from '../../helpers/color/Color_Constant'

const categories = [
  {'title': 'House Keeping', 'image': ImageLinks.houseKeeping, bgColor: '#ff94ba' },
  {'title': 'HVACR', 'image': ImageLinks.hvacr, bgColor: '#ffc5ac'},
  {'title': 'Tailoring', 'image': ImageLinks.tailoring, bgColor: '#aae0ff'},
  {'title': 'Plumber', 'image': ImageLinks.plumber, bgColor: '#aeb6ff'},
  {'title': 'Electrician', 'image': ImageLinks.electician, bgColor: '#e9abff'},
  {'title': 'Barber', 'image': ImageLinks.barber, bgColor: '#ff9494'},
  {'title': 'Beautician', 'image': ImageLinks.beautician, bgColor: '#cecece'},
  {'title': 'Cook', 'image': ImageLinks.cook, bgColor: '#ff94ba' },
  {'title': 'Elderly Care', 'image': ImageLinks.elderlyCare, bgColor: '#ffc5ac'},
  // {'title': 'Mason', 'image': ImageLinks.ma},
  {'title': 'Carpenter', 'image': ImageLinks.carpenter, bgColor: '#aae0ff'},
  // {'title': 'Movers', 'image': ImageLinks.movers, bgColor: '#aeb6ff'},
  {'title': 'Painter', 'image': ImageLinks.painter, bgColor: '#e9abff'},
  {'title': 'Driver', 'image': ImageLinks.driver, bgColor: '#cecece'},
  {'title': 'Photographer', 'image': ImageLinks.photographer, bgColor: '#ff94ba'},
  {'title': 'Tutor', 'image': ImageLinks.tutor, bgColor: '#ff94ba'},
];

export default class CustomerDashboard extends Component {
  state = {
    loading: false,
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.9}
        onPress={() => this.props.navigation.navigate(navigate.ServicesByCategory, {
          category: item.title
        })}
        style={{flex: 1, marginVertical: 10, alignItems: 'center'  }}>
        <View  style={{ width: 70, height: 70, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, padding: 10, borderRadius: 5, backgroundColor: item.bgColor, elevation: 5}}>
          <Image
            style={{width: 40, height: 40, tintColor: 'gray'}}
            source={item.image}
            resizeMode= 'contain'
          />
        </View>
        <Text style={{color: 'black'}}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const { loading } = this.state
    return (
      <SafeAreaProvider>
        <View style={{ ...styles.container }}>
          <Header
            title={'Dashboard'}
            leadingIcon='location'
            leadingButton={() => this.props.navigation.goBack()}
            trailingButton={() => alert('Notification')}
          />
          {loading ?
            <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}><ActivityIndicator color='black' /></View>
            :
          <FlatList
            data={categories}
            numColumns={4}
            keyExtractor={(item,index) => index}
            renderItem={this.renderItem}
          />
          }
        </View>
      </SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryDimColor,
  }
})