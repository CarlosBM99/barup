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
import {Icon} from 'native-base'
import { TabNavigator}  from 'react-navigation'

class Home extends Component {

  onPressButton() {
    Alert.alert('You tapped the button!')
  }

  static navigationOptions = {
    title: "BarUp",
    headerRight: <Icon style={{ paddingRight: 10 }} name="ios-star" />
  }

  render() {
    let area = [{
      value: 'Sants',
    }, {
      value: 'Gràcia',
    }, {
      value: 'Glòries',
    }, {
      value: 'Barri Gòtic'
    }];

    

    let style = [{
      value: 'Cocktail',
    }, {
      value: 'Luxury',
    }, {
      value: 'Young',
    }, {
      value: 'Irish'
    }];

    let filter = [{
      value: 'Beer price',
    }, {
      value: 'Rating',
    }, {
      value: 'Crowd Level',
    }];

    return (
        <View style={{flex:1, padding:50,}}>
          <Dropdown
            label='Select Area'
            data={area}
          />

          <Button
            onPress={this.onPressButton}
            title="Get you Location"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          <Dropdown
            label='Choose Style'
            data={style}
          />

          <Dropdown
            label='Order by'
            data={filter}
          />

          <Button
            onPress={() => this.props.navigation.navigate('Fire')}
            title="Search Bars"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});