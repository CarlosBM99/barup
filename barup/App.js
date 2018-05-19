import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './Components/home'
import listBars from './Components/listBars'
import Detail from './Components/Detail'

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
  listBars: {
    screen: listBars
  },
  Detail: {screen: Detail},
},
  {
    navigationOptions: {
      gesturesEnabled: true
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
