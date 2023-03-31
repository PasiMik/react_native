import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('shoppinglist.db')


export default function App () {

    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList]=useState([]);

    useEffect(()=>{
        db.transaction((tx) =>{
            tx.executeSql('create table if not exists shoppinglist(id integer primary key not null, item text, amount text);');
        }, fetchListError, updateList);
        },[])

    

    const fetchListError=()=>{
        Alert.alert('Fetching error', 'Something went wrong with fetching the list!')
    }
    
    const saveItem=()=>{
        db.transaction((tx)=>{
            tx.executeSql('insert into shoppinglist(item, amount) values(?, ?);',
            [item, amount]);
        }, saveError, updateList)
        setItem("");
        setAmount("");
    }

    const saveError=()=>{
        Alert.alert('Saving error', 'Something went wrong with saving an item!')
    }

    const updateList=()=>{
        db.transaction((tx)=> {
        tx.executeSql('select * from shoppinglist;',[],(_,{rows})=> 
        setShoppingList(rows._array)
        );
    }, fetchListError, updateList)

    }

    const deleteItem=(id)=>{
        db.transaction(
            (tx) => {tx.executeSql('delete from shoppinglist where id=?;', [id]);
        }, deleteError, updateList)

    }

    const deleteError=()=>{
        Alert.alert('Delete error', 'Something went wrong with deleting!')
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
            <Button title='Save' onPress={saveItem}/>
            {shoppingList.length > 0 &&
            <Text style={{marginTop: 30, fontSize: 20}}>Shopping list</Text>}
            <View>
            <FlatList
            keyExtractor={item=>item.id.toString()}
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