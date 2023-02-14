import { StyleSheet, View, Text } from 'react-native';
import React, {useState, useEffect} from "react";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';




export default function App() {
    return(
        <View style={styles.container}>
            <MapView style={{width: '100%', height:'95%'}}
            region={{ //initial Region: only for static map
                latitude: 60.200,
                longitude: 24.93,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0121
            }}
            >
                <Marker
                title='Haaga-Helia'
                pinColor='yellow'
                coordinate={{latitude: 60.2, longitude: 24.93}}/>
            </MapView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',      
    },
  });