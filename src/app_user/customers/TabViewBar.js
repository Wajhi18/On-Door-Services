// import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator, useWindowDimensions } from 'react-native'
// import React, { Component } from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
// const layout = useWindowDimensions();
// function TabViewBar(){
//     const [index, setIndex] = React.useState(0);
//     const [routes] = React.useState([
//       { key: 'first', title: 'First' },
//       { key: 'second', title: 'Second' },
//     ]);
//     const FirstRoute = () => (
//         <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
//       );

//       const SecondRoute = () => (
//         <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
//       );
// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });
//   return (
//    <>
//      <TabView
//   navigationState={{ index, routes }}
//   renderScene={renderScene}
//   onIndexChange={setIndex}
//   initialLayout={{ width: layout.width }}
// />
//    </>
//   )
// }

// export default TabViewBar

import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class TabViewBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
  }


  FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
  );

  SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }} />
  );

  renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={this.renderScene()}
          onIndexChange={alert('')}
          initialLayout={{ width: '100%' }}
        />
      </View>
    )
  }
}