import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, } from 'react-native';
import { Button } from '@rneui/base';
import { auth } from '../FireBaseConfig';
import {useNavigation} from '@react-navigation/core';
import { Header, Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen(){
    
    const navigation = useNavigation();

    const handleSignOut = () =>{
        auth.signOut()
        .then(()=> {
            navigation.replace('Login')
        })
        .catch(err =>console.error(err))
    };

    return(
        <View style={styles.container}>
            <Header
            leftComponent={
                <TouchableOpacity
                onPress={handleSignOut}>
                <Icon  type="simple-line-icon" name="logout" color="white"/>
                </TouchableOpacity>
            }
            centerComponent={{text:'Home', style:{fontSize:20, color: 'white'}}}
            />
            <Text>Email: {auth.currentUser?.email}</Text>
        </View>
    )


};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      
      
    },
    button:{
        backgroundColor:"red"
    }
});