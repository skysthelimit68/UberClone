import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from 'react-native-maps';
import Location from 'expo-location';
import Permissions from 'expo-permissions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null
    }
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("Permission not granted");
    }
    let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }
    this.setState({
      region : region
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Uber Home</Text>
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={false}
          style={{ flex: 1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
