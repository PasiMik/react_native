import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import React, {useState} from "react"


export default function Calculator () {
    const [result, setResult]= useState("")
    const [numberOne, setNumberOne] = useState("")
    const [numberTwo, setNumberTwo] = useState("")

    const add = () =>{
        let sum = Number(numberOne) + Number(numberTwo)
        setResult(sum)
    }

    const deduct = () =>{
        let minus = Number(numberOne) - Number(numberTwo)
        setResult(minus)
    }



    return(
        <View style={styles.container}>
            <View>
            <Text>Result: {result}</Text>
            <TextInput  style={{width: 200, borderColor:"gray", borderWidth: 1}}
            keyboardType = "numeric"
            onChangeText ={text=> setNumberOne(text)}
            value={numberOne}
            />
            <TextInput style={{width: 200, borderColor:"gray", borderWidth: 1}}
            keyboardType = "numeric"
            onChangeText ={text=> setNumberTwo(text)}
            value={numberTwo}
            
            />
            </View>
            <View style={{flexDirection: "row"}}>
                <Button onPress={add} title=" + "/>
                <Button onPress={deduct} title=" - "/>

            </View>

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