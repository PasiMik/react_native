import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { Input, Button, Dialog } from '@rneui/base';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import MapView, {Marker} from 'react-native-maps';
import {MAP_API_TOKEN} from '@env';

export default function App(){
const[place, setPlace] = useState('');
const [visible, setVisible] = useState(false);
const[foundPlace, setFoundPlace]=useState({
    latitude: 60.17116,
    longitude: 24.93265,
    place:'Helsinki',
    latitudeDelta: 5,
    longitudeDelta: 10,
});

const mapRef =useRef();


const findAddress=()=>{
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${MAP_API_TOKEN}&location=${place}`)
    .then(response => response.json())
    .then(data=>{
        setFoundPlace({
            latitude: data.results[0].locations[0].displayLatLng.lat,
            longitude:data.results[0].locations[0].displayLatLng.lng,
            place: data.results[0].locations[0].adminArea5,
            latitudeDelta: 1,
            longitudeDelta: 1,
        })
        

    })
    .catch(err => console.error(err))
}

const openDialog =()=>{
    setVisible(true);
    findAddress();
    
}
const closeDialog =()=>{
    setVisible(false);
    setPlace('');  
    
}



    return(
        <View style={styles.container}>
             <Input
            label='Place'
            value={place}
            onChangeText={text => setPlace(text)}        
            />
            <View style={{width:200}}>
                <Button title='SHOW ON MAP' onPress={()=>openDialog()} />
            </View>
            <View>
            <Dialog isVisible={visible} onBackdropPress={closeDialog} overlayStyle={{backgroundColor:'#E5E4E2', height:'60%', }}>
                <DialogTitle title='Place of test'/>
                <View style={{height:'85%'}}>
                <MapView 
                ref={mapRef}
                style={{width:'100%', height:'100%'}}
                region={foundPlace}>
                <Marker
                coordinate={{
                latitude: Number(foundPlace.latitude),
                longitude: Number(foundPlace.longitude)
                }}
                title={foundPlace.place}/>
            </MapView>                    
                </View>
                <View style={{ alignItems: 'center' }}>
                <Button title='Close' onPress={closeDialog} />
                </View>
            </Dialog>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:100,
      paddingBottom:50
    },
  });