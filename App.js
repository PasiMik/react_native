import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import { Header, Input, Button, Icon,ListItem } from '@rneui/themed';
import { SearchBar } from '@rneui/themed';

const testList = [
    {
        firstName: "Matti",
        occupation: "Driver"
    },
    {
        firstName: "Paavo",
        occupation: "Doctor"
    },
    {
        firstName: "Laila",
        occupation: "Banker"
    },
    {
        firstName: "MaMarkku",
        occupation: "Banker"
    },

]

export default function App() {
const [searchedName, setSearchedName] = useState('')
const [filteredTestList, setFilteredTestList] = useState(testList);

useEffect(() => {
    setFilteredTestList(
      testList.filter(item =>
        item.firstName.toLowerCase().includes(searchedName.toLowerCase())
      )
    );
  }, [searchedName]);

    return(
        <View style={styles.container}>
            <SearchBar
            containerStyle={{width:'80%'}}
            value={searchedName}
            onChangeText={text=>setSearchedName(text)}
            />
            <FlatList
            data={filteredTestList}
            renderItem={({item}) => 
            <ListItem>
                <ListItem.Title>{item.firstName}</ListItem.Title>
                <ListItem.Subtitle>{item.occupation}</ListItem.Subtitle>
            </ListItem>}       
            />
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
     marginTop: 50,
     flex: 1,
     backgroundColor: '#fff',
    justifyContent:'center',
     alignItems:'center',
     flexDirection:'column',
    },
    
   });