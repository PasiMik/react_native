import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import { Avatar } from '@rneui/themed';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Button,Input } from '@rneui/themed';
import { auth } from '../FireBaseConfig';




//const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);



export default function LoginScreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] =useState('');

    const navigation = useNavigation();

    useEffect(()=>{
        fetch('https://dog.ceo/api/breed/australian/images/random')
    .then(response=>response.json())
    .then(data=>{
        setImage(data.message)
        
    })
    .catch(err=>console.error(err))

    }, [])

    useEffect(()=> {
        auth.onAuthStateChanged(user =>{
            if(user){
                navigation.replace('Home')
            };
        });

    }, []);


    const handleSignUp = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials =>{
           const user = userCredentials.user;
           console.log('Registered with',user.email) 
        })
        .catch(err => console.error(err))
    
        setEmail('');
        setPassword(''); 
    };

    const handleLogin = () =>{
        auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials =>{
           const user = userCredentials.user;
           console.log('Logged in with',user.email) 
        })
        .catch(err => console.error(err))
    
        setEmail('');
        setPassword(''); 
    }
    


    return(      
          
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'>            
            <View style={styles.inputContainer}>
                <View style={styles.avatar}>
                <Avatar
                rounded
                size={100}
                source={{uri: image}}
                />
                </View>
                <Input
                placeholder='Email'
                label='Email'
                value={email}
                onChangeText={text =>setEmail(text)}
                />
                <Input
                placeholder='Password'
                label='Password'
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                />
            </View>
            <View style={styles.inputButtons}>
                <Button
                title='Login'
                buttonStyle={styles.loginbutton}
                onPress={handleLogin}
                />
                <Button
                title='Register'
                buttonStyle ={styles.registerbutton}
                onPress={handleSignUp}
                />
            </View>
        </KeyboardAvoidingView>
        

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D3D3D3',
    },

    inputContainer:{
        width:'80%',
        

    },
    inputButtons:{
        width:'50%',
    },
    loginbutton:{
        backgroundColor:'#DA70D6',
        borderWidth: 0,
        borderRadius: 30,
        marginBottom:10
    },
    registerbutton:{
        backgroundColor:'#5D3FD3',
        borderWidth: 0,
        borderRadius: 30,

    },
    avatar:{
        alignItems:'center',
        marginBottom:25,
    }
});