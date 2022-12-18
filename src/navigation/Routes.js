import React, { Component } from 'react'

import Preference from '../views/Preference'
import Main_Screen from '../views/Main_Screen'
import Login_Screen from '../views/Login_Screen'
import SignUp_Screen from '../views/SignUp_Screen'
import Forget_Password from '../views/Forget_Password'
import Reset_Password from '../views/Reset_Password'

import { navigate } from '../helpers/color/navigate'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderDashboard from '../app_user/service_providers/Provider_Dashboard'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProviderMap from '../app_user/service_providers/ProviderMap'
import ProviderProfile from '../app_user/service_providers/ProviderProfile'
import ProviderNotification from '../app_user/service_providers/ProviderNotification'
import CustomerDashboard from '../app_user/customers/CustomerDashboard'
import ServicesByCategory from '../app_user/customers/ServicesByCategory'
import ServiceDetail from '../app_user/customers/ServiceDetail'
import ProviderOrderDetails from '../app_user/service_providers/ProviderOrderDetails'
import ReviewPage from '../app_user/customers/ReviewPage'
import SelectAppointment from '../app_user/customers/SelectAppointment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CompletedOrders from '../app_user/customers/CompletedOrders'
import CustomerChat from '../app_user/customers/CustomerChat'
import CustomerMessages from '../app_user/customers/CustomerMessages'
import CustomerProfile from '../app_user/customers/CustomerProfile'
import ProviderChat from '../app_user/service_providers/ProviderChat'
import ProviderReview from '../app_user/service_providers/ProviderReview'
import ProviderMessage from '../app_user/service_providers/ProviderMessage'
import CustomerOrderDetails from '../app_user/customers/CustomerOrderDetails'
import ProviderEditProfile from '../app_user/service_providers/ProviderEditProfile'
import ProviderMapViewComponent from '../app_user/service_providers/ProviderMapViewComponent'
import TabViewBar from '../app_user/customers/TabViewBar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ActiveOrders from '../app_user/customers/ActiveOrders'
import RequestedOrders from '../app_user/customers/RequestedOrders'
import AddServices from '../app_user/service_providers/AddServices'
import SplashScreen from '../views/SplashScreen'
import CustomerEditProfile from '../app_user/customers/CustomerEditProfile'

const Stack = createNativeStackNavigator();

export default class Routes extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={navigate.SplashScreen} component={SplashScreen} />
        <Stack.Screen name={navigate.Preference} component={Preference} />
        <Stack.Screen name={navigate.Main_screen} component={Main_Screen} />
        <Stack.Screen name={navigate.Login_Screen} component={Login_Screen} />
        <Stack.Screen name={navigate.SignUp_Screen} component={SignUp_Screen} />
        <Stack.Screen name={navigate.Forget_Password} component={Forget_Password} />
        <Stack.Screen name={navigate.Reset_Password} component={Reset_Password} />
        <Stack.Screen name={navigate.ProviderEditProfile} component={ProviderEditProfile} />
        <Stack.Screen name={navigate.ProviderMapViewComponent} component={ProviderMapViewComponent} />
        <Stack.Screen name={navigate.AddServices} component={AddServices} />
        
        
        {/* Customer Stack */}
        <Stack.Screen name={navigate.CustomerBottomRoutes} component={CustomerBottomRoutes} />
        <Stack.Screen name={navigate.ServicesByCategory} component={ServicesByCategory} />
        <Stack.Screen name={navigate.ServiceDetail} component={ServiceDetail} />
        <Stack.Screen name={navigate.ReviewPage} component={ReviewPage} />
        <Stack.Screen name={navigate.SelectAppointment} component={SelectAppointment} />
        <Stack.Screen name={navigate.CustomerOrderDetails} component={CustomerOrderDetails} />
        <Stack.Screen name={navigate.CustomerEditProfile} component={CustomerEditProfile} />
        <Stack.Screen name={navigate.CustomerMessages} component={CustomerMessages} />

        {/* Provider Stack */}
        <Stack.Screen name={navigate.ProviderBottomRoutes} component={ProviderBottomRoutes} />
        <Stack.Screen name={navigate.ProviderNotification} component={ProviderNotification} />
        <Stack.Screen name={navigate.ProviderOrderDetails} component={ProviderOrderDetails} />
        <Stack.Screen name={navigate.ProviderMap} component={ProviderMap} />
        <Stack.Screen name={navigate.ProviderMessage} component={ProviderMessage} />
      </Stack.Navigator>
    )
  }
}

const ProviderBottom = createBottomTabNavigator();
class ProviderBottomRoutes extends Component {
  render() {
    return (
      <ProviderBottom.Navigator screenOptions={{ headerShown: false }}>
        <ProviderBottom.Screen
          name={navigate.Provider_Dashboard}
          component={ProviderDashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        {/* <ProviderBottom.Screen
          name={navigate.ProviderChat}
          component={ProviderChat}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-outline" color={color} size={26} />
            ),
          }}
        /> */}

        <ProviderBottom.Screen
          name={navigate.ProviderReview}
          component={ProviderReview}
          options={{
            tabBarLabel: 'Reviews',
            tabBarIcon: ({ color }) => (
              <AntDesign name="calendar" color={color} size={26} />
            ),
          }}
        />

        <ProviderBottom.Screen
          name={navigate.ProviderProfile}
          component={ProviderProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={26} />
            ),
          }}
        />

      </ProviderBottom.Navigator>
    )
  }
}

const CustomerBottom = createBottomTabNavigator();
class CustomerBottomRoutes extends Component {
  render() {
    return (
      <CustomerBottom.Navigator screenOptions={{ headerShown: false }}>
        <CustomerBottom.Screen
          name={navigate.CustomerDashboard}
          component={CustomerDashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <CustomerBottom.Screen
          name={navigate.CustomerOrders}
          component={CustomerOrderTopTab}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({ color }) => (
              <AntDesign name="calendar" color={color} size={26} />
            ),
          }}
        />

        {/* <CustomerBottom.Screen
          name={navigate.CustomerChat}
          component={CustomerChat}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-outline" color={color} size={26} />
            ),
          }}
        /> */}

        <CustomerBottom.Screen
          name={navigate.CustomerProfile}
          component={CustomerProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={26} />
            ),
          }}
        />
      </CustomerBottom.Navigator>
    )
  }
}

const TopTab = createMaterialTopTabNavigator()
class CustomerOrderTopTab extends Component {
  render(){
    return(
      <TopTab.Navigator tabBarPosition='bottom'>
        <TopTab.Screen name={navigate.RequestedOrders} component={RequestedOrders}/>
        <TopTab.Screen name={navigate.ActiveOrders} component={ActiveOrders}/>
        <TopTab.Screen name={navigate.CompletedOrders} component={CompletedOrders}/>        
      </TopTab.Navigator>
    )
  }
}