import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import React, {useState, useEffect} from "react"

export default function History({route}){
    const {data} = route.params
    
    
return(
    <View style={{justifyContent: "center", alignItems:"center"}}>
           <View style={{ alignItems: 'center' }}>
            <FlatList
                data = {data}
                renderItem={({item})=><Text>{item}</Text>}
            />
            </View>
    </View>);
};
