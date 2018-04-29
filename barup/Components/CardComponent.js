import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon, Item } from 'native-base'
import { TabNavigator }  from 'react-navigation'

class CardComponent extends Component {

  render() {
    return (
        <Card>
          <CardItem style={{marginBottom:-20}}>
            <Image source={require('../assets/bar1.jpg')} style={{marginTop:-10, height: 100, width: 130}}/>
            <Body style={{paddingLeft: 10}}>
              <Text>El bareto</Text>
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
    );
  }

}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});