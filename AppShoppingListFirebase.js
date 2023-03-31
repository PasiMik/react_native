import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';
import {FIREBASE_API} from '@env'

const firebaseConfig = {
    apiKey: FIREBASE_API,
    authDomain: "shoppinglist-789cf.firebaseapp.com",
    databaseURL: "https://shoppinglist-789cf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-789cf",
    storageBucket: "shoppinglist-789cf.appspot.com",
    messagingSenderId: "394264434596",
    appId: "1:394264434596:web:af041c44b7c89343851331"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  ref(database,'shoppinglist/')



export default function App () {

    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList]=useState([]);


    useEffect(() => {
        const itemsRef = ref(database, 'shoppinglist/');
        onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        let list = Object.values(data)
        list.forEach((item, index) => {
            item.id = Object.keys(data)[index]
        })
        setShoppingList(list)
        })
        }, []);


    const saveItem = () => {
        push(
        ref(database, 'shoppinglist/'),
        { 'item': item, 'amount': amount });

        setItem("");
        setAmount("")
    
    }
    console.log(shoppingList)

    const deleteItem = (id) =>{
        const itemsRef = ref(database, 'shoppinglist/' + id);
        remove(itemsRef)
    }

       



    return(
        <View style={styles.container}>            
            <TextInput
            style={{width:150, borderWidth:1, borderColor:"gray"}}
            placeholder='Shopping item'
            onChangeText={item=>setItem(item)}
            value={item}/>
             <TextInput
            style={{width:150, borderWidth:1, borderColor:"gray"}}
            placeholder='Amount'
            onChangeText={amount=>setAmount(amount)}
            value={amount}/>  
            <Button title='Save' onPress={saveItem} /> 
            {shoppingList.length > 0 &&
            <Text style={{marginTop: 30, fontSize: 20}}>Shopping list</Text>}
            <View>
            <FlatList
            renderItem={({item})=>
                <View style={{flex:1, flexDirection:"row"}}>
                <Text>{item.item}, {item.amount}</Text>
                <Text style={{color:"red", marginLeft:20}} onPress={()=>deleteItem(item.id)}>Delete</Text>
                </View>}
            data={shoppingList}
            />
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
      marginTop:150
    },
  });