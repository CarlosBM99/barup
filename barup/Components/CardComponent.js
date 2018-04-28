import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import { TabNavigator }  from 'react-navigation'

class CardComponent extends Component {

  render() {
    return (
        <Card>
          <CardItem>
            <Image source={require('../assets/bar1.jpg')} style={{height: 100, width: 130}}/>
          </CardItem>
          <CardItem>
            <Button>
              <Icon name="home"/>
            </Button>
            <Button>
              <Icon name="home"/>
            </Button>
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