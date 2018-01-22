import React from 'react'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      headerTitle: 'Explorar'
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    )
  }
}