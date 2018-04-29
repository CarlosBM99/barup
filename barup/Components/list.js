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
import { Icon, Container, Content, ListView } from 'native-base'
import { TabNavigator}  from 'react-navigation'
import CardComponent from './CardComponent'

/* import * as firebase from 'firebase'; */

// Initialize Firebase


/* firebase.initializeApp(firebaseConfig); */

var data = []

class List extends Component {

  constructor(props) {
    super(props);
    
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newContact: ""
    }

  }

  componentDidMount() {

    var that = this

    firebase.database().ref('/bars').on('child_added', function (data) {

      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData })

    })

  }

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
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <CardComponent />
            }
          />
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