import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
})

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    )
  }
}