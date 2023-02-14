import {View, Text, Button, TextInput, FlatList, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';
import { API_TOKEN } from'@env';

export default function Converter(){
const[sum, setSum]=useState("");
const[currencies, setCurrencies]=useState([]);
const [selectedSymbol, setSelectedSymbol]=useState();
const [convertedSum, setConvertedSum]=useState("")
const[loading, setLoading] =useState(false);
const[euro, setEuro] =useState("")

useEffect(()=>{
    setLoading(true);
    fetch(`https://api.apilayer.com/exchangerates_data/symbols`,{
        headers:{'apikey':`${API_TOKEN}`}
    })
    .then(response=>response.json())
    .then(data=>{
        setCurrencies(Object.keys(data.symbols))
        setLoading(false)
    })
    .catch(err=>console.error(err))
},[])

const ConvertToEuro=()=>{
    setLoading(true);
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedSymbol}&amount=${sum}`,{
        headers:{'apikey':`${API_TOKEN}`}
    })
    .then(response=>response.json())
    .then(data=>{
        setConvertedSum(data.result)
        setLoading(false)
        setEuro("€");
    })
    .catch(err=>console.error(err))
}


    return(
        <View>
            <ActivityIndicator size="small"animating={loading}/>
            <Text>{convertedSum}{euro}</Text>
            <View style={{flexDirection:'row'}}>
            <TextInput
            value={sum}
            onChangeText={(text)=>setSum(text)}
            style={{width:100, borderColor:'gray', borderWidth:1}}
            />
            <Picker
            style={{width:100}}
            selectedValue={selectedSymbol}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedSymbol(itemValue)}>
            {currencies.map((symbols, index)=>(
                <Picker.Item
                label={symbols}
                value={symbols}
                key={index}/>
            ))}                
            </Picker>
            </View>
            <Button title="Convert" onPress={ConvertToEuro}/>
        </View>
    )
}
