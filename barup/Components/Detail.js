import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'

var {width,height} = Dimensions.get('window')

class Detail extends Component {

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
  
  barImage = [
    require('../assets/bar1.jpg'),
    require('../assets/bar2.jpg'),
    require('../assets/bar3.jpg'),
    require('../assets/bar4.jpg'),
    require('../assets/bar5.jpg'),
  ]

	render(){

    const { navigation } = this.props;
    const info = navigation.getParam('info', 'NO-ID');

		return(
		  <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.name}>
            <Text style={{fontSize:30}}>{info.val().name}</Text>
          </View>

          <View style={styles.rating}>
            <Icon style={{fontSize:30}} name="beer"/>
            <Icon style={{fontSize:30}} name="beer"/>
            <Icon style={{fontSize:30}} name="beer"/>
            <Icon style={{fontSize:30}} name="beer"/>
          </View>

          <View style={styles.fav}>
            <Icon style={{fontSize: 50, color: 'black'}} name="star"/>
          </View>
        </View>

        <View style={styles.ambient}>
          <Text style={{fontSize:20,color:'white'}}>Luxurious</Text>
        </View>

        <View style={styles.barImage}>
          <Text>Bar Image</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemContainer}>
            <View style={styles.details}>
              <Text>Beer</Text>
            </View>

            <View style={styles.details}>
              <Text>CocaCola</Text>  
            </View>

            <View style={styles.details}>
              <Text>Coffee</Text>
            </View>
          </View>


          <View style={styles.badgeContainer}>
            <View style={styles.details}>
              <Text>Darts</Text>
            </View>

            <View style={styles.details}>
              <Text>Table Football</Text>
            </View>

            <View style={styles.details}>
              <Text>Billiards</Text>
            </View>
          </View>
        </View>

        <View style={styles.barMap}>
        <Text>Bar Map</Text>
        </View>

      </View>
		)
	}
}

export default Detail;

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  name: {
    width: "33%",
    height: (height)*0.1,
    alignItems:'center',
    justifyContent:'center',
  },
  rating: {
    width: "33%",
    height: (height)*0.1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
  },
  fav: {
    width: "33%",
    height: (height)*0.1,
    alignItems:'center',
    justifyContent:'center',
  },
  ambient: {
    width: "100%",
    height: (height)*0.05,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  barImage: {
    width: "100%",
    height: (height)*0.25,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'grey',
  },
  itemContainer: {
    width: "50%",
    height: (height)*0.25,
    backgroundColor:'orange',
  },
  details:{
    marginRight:"10%",
    height:"33%",
    padding:10,
  },
  badgeContainer: {
    width: "50%",
    height: (height)*0.25,
    backgroundColor:'yellow',
  },
  barMap: {
    width: "100%",
    height: (height)*0.35,
    backgroundColor:'grey',
    alignItems:'center',
    justifyContent:'center',
  }
});