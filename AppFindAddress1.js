import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import MapView, {Marker} from 'react-native-maps';
import {MAP_API_TOKEN} from '@env';
import * as Location from 'expo-location';




export default function App() {
    const [address, setAddress] = useState({
        latitude: 60.200,
        longitude: 24.93,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121
    });
    const[typedAddress, setTypedAddress] = useState("");
    const [searchedAddress, setSearchedAddress]=useState({
        latitude:"",
        longitude:"",
        streetAddress:"",
    });
    
    const mapRef =useRef();

    const findAddress=()=>{
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${MAP_API_TOKEN}=${typedAddress}`)
        .then(response => response.json())
        .then(data=>{
            setSearchedAddress({
                latitude: data.results[0].locations[0].displayLatLng.lat,
                longitude:data.results[0].locations[0].displayLatLng.lng,
                streetAddress:data.results[0].locations[0].street,
            })
            
            mapRef.current.animateToRegion({
                latitude: data.results[0].locations[0].displayLatLng.lat,
                longitude: data.results[0].locations[0].displayLatLng.lng,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0121
            })
        })
        .catch(err => console.error(err))
    }
    
    

    return(
        <View style={styles.container}>
            <MapView 
            ref={mapRef}
            style={{width:'100%', height:'90%'}}
            region ={address}>       
            <Marker
            coordinate={{
                latitude: Number(searchedAddress.latitude),
                longitude: Number(searchedAddress.longitude)
            }}
            title={searchedAddress.streetAddress}/>
            </MapView>
        <View>
            <TextInput
            placeholder='Type address here'
            value={typedAddress}
            onChangeText={(text) => setTypedAddress(text)}
            style={{width:'100%', borderColor:'gray', borderWidth:1 }}
            />
            <Button title='SHOW' onPress={findAddress}></Button>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',      
    },
  });