import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Picker,
  Image,
  Button,
  Alert
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown'
import { Icon, Container, Content } from 'native-base'
import { TabNavigator}  from 'react-navigation'
import CardComponent from './CardComponent'

class List extends Component {

  static navigationOptions = {
    title: 'List of bars',
    headerStyle: {
      backgroundColor: '#cccc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: <Icon style={{ paddingRight: 10, color: 'white' }} name="ios-star" />
  }

  render() {
    return (
        <Container style={styles.container}>
          <Content>
            <CardComponent />
          </Content>
        </Container>
    );
  }

}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});