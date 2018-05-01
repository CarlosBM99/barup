import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {Button} from 'react-native-elements'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon,Input,Item,} from 'native-base'
import { TabNavigator}  from 'react-navigation'
import SegmentedControlTab from 'react-native-segmented-control-tab';

const dartCheck = require('../assets/dart_check.png');
const dartUncheck = require('../assets/dart.png');
const footballCheck = require('../assets/football_check.png');
const footballUncheck = require('../assets/football.png');
const billiardsCheck = require('../assets/billiards_check.png');
const billiardsUncheck = require('../assets/billiards.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        filterIndex: -1,
        showDarts: false,
        showFootball: false,
        showBilliards: false,
        PickerValue:'',
    }
  }

  renderDarts()  {
    var tempDarts = this.state.showDarts? dartCheck : dartUncheck;
    return (
      <Image
        style={ styles.badge }
        source={ tempDarts }
      />
    );
  }

  renderFootball()  {
    var tempFootball = this.state.showFootball? footballCheck : footballUncheck;
    return (
      <Image
        style={ styles.badge }
        source={ tempFootball }
      />
    );
  }

  renderBilliards()  {
    var tempBilliards = this.state.showBilliards? billiardsCheck : billiardsUncheck;
    return (
      <Image
        style={ styles.badge }
        source={ tempBilliards }
      />
    );
  }
/****TEMP****/
  onPressButton() {
    Alert.alert('You tapped the button!')
  }
/************/

  static navigationOptions = {
    title: "BarUp",
    headerRight: <Icon style={{ paddingRight: 20, color: "#fed849" }} name="ios-star"/>,
    headerStyle : { backgroundColor: 'black' },
    headerTitleStyle: { color: '#fed849' },
  }

  render() {

    let atm = [{
      value: 'Luxurious',
    }, {
      value: 'Youthful',
    }, {
      value: 'Familiar',
    }, {
      value: 'Hardcore',
    }
    ];

    let filter = [{
      value: 'Beer Price',
    }, {
      value: 'Rating',
    }, {
      value: 'Crowd Level',
    },
    ];

    return (
      
      <View style={{flex:1, padding:50}}>
      <StatusBar barStyle="light-content"/>
          <View style={{flex:1, marginLeft:5}}>
            <Item style={{backgroundColor:'white', paddingHorizontal: 10, borderRadius:10}}>
              <Icon name="search" style={{fontSize: 20, paddingTop: 5}}/>
              <Input placeholder="Search for your city"/>
            </Item>
          
             

          <Button
            onPress={this.onPressButton}
            title="Get your Location"
            buttonStyle = {styles.button}
            style={{paddingBottom:20,marginTop:"5%"}}
          />

           <Dropdown
            label='Atmosphere'
            data={atm}
          />

          <Dropdown
            label='Order by'
            data={filter}
          />

    <View style={{flexDirection:'row', marginTop:"10%", marginBottom:"10%",marginLeft:"-8%"}}>
          <TouchableOpacity
            onPress={ () => this.setState({ showDarts: !this.state.showDarts }) } 
          >
            {this.renderDarts()}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => this.setState({ showFootball: !this.state.showFootball }) } 
          >
            {this.renderFootball()}

          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => this.setState({ showBilliards: !this.state.showBilliards }) } 
          >
            {this.renderBilliards()}
          </TouchableOpacity>
    </View>

          <Button
            large
            onPress={this.onPressButton}
            onPress={() => this.props.navigation.navigate('listBars')}
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
    backgroundColor: "black",
    borderColor: "#f49f44",
    borderWidth: 1,
    borderRadius: 10,
  },
  headerText: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
  badge: {
    padding: 50,
    marginBottom: "10%",
    height:100,
    width:100,
    alignSelf:'center',
  },
});