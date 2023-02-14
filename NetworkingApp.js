import { StyleSheet, View, Text } from 'react-native';
import React, {useState} from "react"
import GithubRepo from './components/GithubRepo';



export default function App() {
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <GithubRepo/>
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