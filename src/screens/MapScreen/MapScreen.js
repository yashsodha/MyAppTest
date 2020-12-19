import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    PermissionsAndroid
} from 'react-native';

import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import PushServiceAndroid from '../../util/push_service_android'

const { width, height } = Dimensions.get('window');


export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: {
                latitude: 0,
                longitude: 0
            },
            markers: []
        };
    }

    requestLocationPermission = async () => {
        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "App Geolocation Permission",
                message: "App needs access to your phone's location.",
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        current: position.coords
                    })

                    this.props.sendNotification(position.coords)


                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        else {
            console.log('Location permission not granted!!!!');
        }
    };

    choosePolly = (coordinate) => {
        let distence = this.getDistanceFromLatLonInKm(this.state.current.latitude, this.state.current.longitude, coordinate.latitude, coordinate.longitude)

        this.setState({
            selectedLatitude: coordinate.latitude,
            selectedLongitude: coordinate.longitude,
            distence: distence
        })
    }

    componentDidMount() {
        this.requestLocationPermission()
        PushServiceAndroid.configure()
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    render() {
        return (
            <>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ color: 'blue', fontSize: 25, textAlign: 'center', marginTop: 30 }}>
                        {!this.state.distence ? "Please Select Loaction from Map" :
                            `Distence is ${this.state.distence.toFixed(2)} KM`}
                    </Text>
                </View>
                <View style={styles.container}>
                    {this.state.current.latitude > 0 && <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                        initialRegion={{
                            latitude: Number(this.state.current.latitude),
                            longitude: Number(this.state.current.longitude),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        onPress={(e) => this.choosePolly(e.nativeEvent.coordinate)}>
                        <Marker
                            coordinate={{
                                latitude: this.state.current.latitude,
                                longitude: this.state.current.longitude
                            }}
                            description={"This is a marker in React Natve"}
                        >
                            <Text style={{ fontSize: 30 }}>You Here</Text>
                        </Marker>
                        {this.state.selectedLongitude > 0 && <Polyline
                            coordinates={[
                                { latitude: this.state.current.latitude, longitude: this.state.current.longitude },
                                { latitude: this.state.selectedLatitude, longitude: this.state.selectedLongitude },
                            ]}
                            strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#B24112',
                                '#238C23',
                            ]}
                            strokeWidth={2}
                        />}

                        {this.state.selectedLatitude && <Marker
                            coordinate={{
                                latitude: this.state.selectedLatitude,
                                longitude: this.state.selectedLongitude
                            }}
                            description={"This is a marker in React Natve"}
                        >
                            <Text style={{ fontSize: 20 }}>Selected distance area</Text>
                        </Marker>}
                    </MapView>}
                </View>
            </>
        );
    }
}

MapScreen.propTypes = {
    provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 100
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
