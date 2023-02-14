import {View, Text, Button, TextInput, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react'

export default function GithubRepo(){
const [data, setData] = useState([]);
const [keyword, setKeyword] = useState("");
const[loading, setLoading] =useState(false);

const fetchRepos=() =>{
    setLoading(true);
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => response.json())
    .then(data => {
        setData(data.items)
        setLoading(false)
        })
    .catch(err =>console.error(err))
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
            value={keyword}
            onChangeText={text => setKeyword(text)}
            style={{width:300, borderColor:'gray', borderWidth:1}}
            >
        </TextInput>
        <Button title="SEARCH" onPress={fetchRepos}/>
        <FlatList
        data={data}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({item})=>
            <View>
                <Text style={{fontSize:20}}>{item.full_name}</Text>
                <Text style={{fontSize:20}}>{item.description}</Text>
            </View>
            
            }          
            
        />
    </View>
)
};
