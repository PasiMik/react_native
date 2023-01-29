import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import React, {useState} from "react"


export default function Calculator () {
    const [result, setResult]= useState("");
    const [numberOne, setNumberOne] = useState("");
    const [numberTwo, setNumberTwo] = useState("");
    const [history, setHistory] = useState([]);
    const [historyText, setHistoryText]=useState("")

    const add = () =>{
        let sum = Number(numberOne) + Number(numberTwo);
        setHistoryText("History")
        setResult(sum);
    setHistory([`${numberOne} + ${numberTwo} = ${sum}`,...history]);
    }

    const deduct = () =>{
        let minus = Number(numberOne) - Number(numberTwo)
        setHistoryText("History")
        setResult(minus)
        setHistory([`${numberOne} - ${numberTwo} = ${minus}`,...history]);
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
            <View style={{alignItems:"center"}}>
                <Text>{historyText}</Text>
                <FlatList
                data = {history}
                renderItem={({item})=><Text>{item}</Text>}
                />
            </View>

        </View>
    )
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