import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './Components/home'
import List from './Components/list'
import Fire from './Components/testfire'

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }

}

const AppStackNavigator = StackNavigator({

  Main: {
    screen: Home
  },
  List: {
    screen: List
  },
  Fire: {
    screen: Fire
  }
},
  {
    navigationOptions: {
      gesturesEnabled: false
    }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});