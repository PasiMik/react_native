import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import React, {useState} from "react"


export default function Settings() {


return(
  <View style={{justifyContent:"center", alignItems:"center"}}>
    <Text style={{fontSize:20}}>This is settings!!</Text>
  </View>
);    

}



const styles = StyleSheet.create({
    container: {
      marginTop: 150,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });