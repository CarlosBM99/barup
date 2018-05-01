import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
    authDomain: "barup-ca0f9.firebaseapp.com",
    databaseURL: "https://barup-ca0f9.firebaseio.com",
    projectId: "barup-ca0f9",
    storageBucket: "barup-ca0f9.appspot.com",
    messagingSenderId: "1060030692240"
  };

firebase.initializeApp(firebaseConfig);

var data = []

class listBars extends Component {

  constructor(props) {
    super(props);
    
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
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
    headerTitle: "BarUp",
    headerTintColor:"#fed849",
    headerRight: <Icon style={{color: "#fed849" }} name="ios-star"/>,
    headerTitleStyle: { color: '#fed849' },
    headerStyle:{
      paddingRight: 10,
      paddingLeft: 5,
      backgroundColor: 'black'
    }
  }

  render() {
    return (
      
      <Container style={styles.container}>
        <Content>
          <ListView
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <Card>
                <CardItem style={{marginBottom:-20}}>
                  <Image source={require('../assets/bar1.jpg')} style={{height: 100, width: 130}}/>
                  <Body style={{paddingLeft: 10}}>
                    <Text>{data.val().name}</Text>
                    <Text style={{marginTop: 10}}>Location</Text>
                    <Item style={{marginTop: 10}}>
                      <Icon name="beer"/>
                      <Icon name="beer"/>
                      <Icon name="beer"/>
                      <Icon name="beer"/>
                    </Item>
                  </Body>
                  <Right style={{marginTop:-50, marginRight:10}}>
                    <Icon style={{fontSize: 40, color: 'black'}} name="star"/>
                  </Right>
                </CardItem>
                <CardItem style={{marginTop:0, height:45}}>
                  <Item style={{height:36, width:36}} rounded>
                    <Icon style={{fontSize: 20, color: 'red'}} name="pizza"/>
                  </Item>
                  <Item style={{height:36, width:36}} rounded>
                    <Icon style={{fontSize: 20, color: 'green'}} name="eye"/>
                  </Item>
                  <Item style={{height:36, width:36}} rounded>
                    <Icon style={{fontSize: 20, color: 'blue'}} name="home"/>
                  </Item>
                  <Text style={{marginLeft:20, fontSize:20}}> 1,45€ <Text style={{fontSize:10}}>/Beer</Text>
                  </Text>
                  <Text style={{marginLeft:30, fontSize:20}}>
                    Full
                  </Text>
                  <Icon style={{marginLeft:5}} name="information-circle"/>
                </CardItem>
              </Card>
            }
          />

        </Content>
      </Container>
    );
  }
}

export default listBars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  }
});
