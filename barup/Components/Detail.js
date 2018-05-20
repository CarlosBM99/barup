import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'

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
  
	render(){

    const { navigation } = this.props;
    const info = navigation.getParam('info', 'NO-ID');

		return(
		  <View style={styles.container}>
        <Text>{info.val().name}</Text>
        <Text>{info.val().beerPrice}</Text>
        <Text>{info.val().location}</Text>
        <Text>{info.val().rating}</Text>
      </View>
		)
	}
}

export default Detail;

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});