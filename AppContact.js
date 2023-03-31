import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import * as Contacts from 'expo-contacts';

export default function App () {

  const [contact, setContact] =useState({});

  const getContacts = async () =>{
    const {status} = await Contacts.requestPermissionsAsync();
    if(status==="granted"){
      const {data} = await Contacts.getContactsAsync(
        {fields: [Contacts.Fields.PhoneNumbers]}
      );
      if(data.length > 0){
        setContact(data)
      };
    };
  };

  

  for (let i=0; i<contact.length; i++){
   console.log(contact[i])
  } 


return(
    <View style={styles.container}>
      <View>
       <FlatList
       data={contact}
       renderItem={({item})=><Text>{item.name} {item.phonNumbers[0].number}</Text>}       >

       </FlatList>
      </View>
      <View>
        <Button title="Contacts" onPress={getContacts}></Button>
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
      marginTop:100,
      paddingBottom:50
    },
  });