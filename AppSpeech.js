import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import * as Speech from 'expo-speech';

export default function App () {

    const[spokenText, setSpokenText]=useState("")

    const speak = () =>{
        let thingToSay = spokenText
        Speech.speak(thingToSay)
    }


return(
    <View style={styles.container}>
        <TextInput
        style={{width:150, borderWidth:1, borderColor:"gray"}}
        placeholder="Text to speak"
        onChangeText={spokenText=>setSpokenText(spokenText)}
        value={spokenText}
        >
        </TextInput>
        <Button title="Speak" onPress={speak}></Button>

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