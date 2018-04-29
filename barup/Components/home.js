import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Picker,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Button} from 'react-native-elements'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon,Input,Item,} from 'native-base'
import { TabNavigator}  from 'react-navigation'
import SegmentedControlTab from 'react-native-segmented-control-tab';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        atmIndex: -1,
        filterIndex: -1,
    }
  }

  handleAtmIndex = (index) => {
    this.setState({
        ...this.state,
        atmIndex: index,
    });
  }

  handleFilterIndex = (index) => {
    this.setState({
        ...this.state,
        filterIndex: index,
    });
  }
/****TEMP****/
  onPressButton() {
    Alert.alert('You tapped the button!')
  }
/******+*****/

  static navigationOptions = {
    title: "BarUp",
    headerRight: <Icon style={{ paddingRight: 20, color: "#fed849" }} name="ios-star"/>,
    headerStyle : { backgroundColor: 'black' },
    headerTitleStyle: { color: '#fed849' },
  }

  render() {

    const atmposhpere = ['Luxurius','Youthful','Familiar','Hardcore'];
    const filter = ["Beer Price","Rating","Crowd Level"];

    return (
      
      <View style={{flex:1, padding:50, backgroundColor:"#4d4d4d"}}>
      <StatusBar barStyle="light-content"/>
          <View style={{flex:1, marginLeft:5}}>
            <Item style={{backgroundColor:'white', paddingHorizontal: 10, borderRadius:10,marginBottom:15}}>
              <Icon name="search" style={{fontSize: 20, paddingTop: 5}}/>
              <Input placeholder="Search for your city"/>
            </Item>
          
          
          

          <Button
            onPress={this.onPressButton}
            title="Get your Location"
            buttonStyle = {styles.button}
            style={{paddingBottom:20}}
          />

          <Text style={styles.headerText}>Atmosphere</Text>
          <SegmentedControlTab

                    values={atmposhpere}
                    selectedIndex={this.state.atmIndex}
                    onTabPress={this.handleAtmIndex}
                    borderRadius={10}
                    tabsContainerStyle={{ height: 50, backgroundColor: 'transparent'}}
                    tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 2, borderColor: '#f49f44',width:"120%"}}
                    activeTabStyle={{ backgroundColor: 'black', marginTop: 2 }}
                    tabTextStyle={{ color: 'black',fontWeight:'bold'}}
                    activeTabTextStyle={{ color: '#f49f44' }} />
          <Text></Text>

          <Text style={styles.headerText}>Filter by</Text>
          <SegmentedControlTab

                    values={filter}
                    selectedIndex={this.state.filterIndex}
                    onTabPress={this.handleFilterIndex}
                    borderRadius={10}
                    tabsContainerStyle={{ height: 50, backgroundColor: 'transparent'}}
                    tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 2, borderColor: '#f49f44',width:"120%"}}
                    activeTabStyle={{ backgroundColor: 'black', marginTop: 2 }}
                    tabTextStyle={{ color: 'black',fontWeight:'bold'}}
                    activeTabTextStyle={{ color: '#f49f44' }} />
          <Text></Text>

          <TouchableOpacity onPress={()=>{alert("In construction...")}}>
            <Image source={require("../assets/darts_unchecked.png")} style={styles.badge}/>
          </TouchableOpacity>

          <Button
            large
            onPress={this.onPressButton}
            title="Search Bars"
            buttonStyle={styles.button}
          />
        </View>
        </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "#f49f44",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputBox: {
    height:35,
    width:300,
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:20,
    color:'#ffffff',
    marginBottom: 30,
    textAlign: "center",
    flex: 1,
  },
  headerText: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
  badge: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    height:60,
    width:60,
  },
});