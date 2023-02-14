import { StyleSheet, View, Text } from 'react-native';
import React, {useState} from "react"
import Converter from './components/Converter';



export default function App() {
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Converter/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });