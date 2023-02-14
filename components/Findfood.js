import {View, Text, Button, TextInput, FlatList, ActivityIndicator, Image} from 'react-native';
import React, {useState} from 'react'

export default function FindFood() {
    const[searchword, setSearchword] =useState("");
    const[food, setFood]=useState([]);
    const[loading, setLoading] =useState(false);

    const fetchFood=()=>{
        setLoading(true)
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchword}`)
        .then(response=>response.json())
        .then(data=>{
            setFood(data.meals)
            setLoading(false)})
        .catch(err=>console.error(err))
    }
    
    const itemSeparator =() =>{
        return(
            <View style={{height:1, backgroundColor:'gray'}}/>
        )
    }
    
    return(
        <View style={{marginTop:80, marginLeft:10, marginRight:10}}>
            <ActivityIndicator size="small"animating={loading}/>
            <TextInput
            value={searchword}
            onChangeText={(text)=>setSearchword(text)}
            style={{width:300, borderColor:'gray', borderWidth:1}}
            />
            <Button title="Search" onPress={fetchFood}/>
            <FlatList
            data={food}
            ItemSeparatorComponent={itemSeparator}
            renderItem={({item})=>
            <View>
                <Text style={{fontSize:20}}>{item.strMeal}</Text>
                <Image style={{width:250, height:100}}
                        source={{uri: item.strMealThumb}}/>
            </View> 
            }
            />    
        </View>
    );
};