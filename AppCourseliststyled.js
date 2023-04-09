import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, Icon,ListItem } from '@rneui/themed';


const db = SQLite.openDatabase('coursedb.db');

export default function CourseList() {
  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists course (id integer primary key not null, credits int, title text);');
    });
    updateList();    
  }, []);

  // Save course
  const saveItem = () => {
    if (credit && title) {
      db.transaction(tx => {
          tx.executeSql('insert into course (credits, title) values (?, ?);', [parseInt(credit), title]);    
        }, null, updateList
      )
    }
    else {
      Alert.alert('Error', 'Type credit and title first');
    }
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from course;', [], (_, { rows }) =>
        setCourses(rows._array)
      ); 
      setTitle('');
      setCredit('')
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from course where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{text:'My courses', style:{fontSize:16, color:'white'}}}
      />
      <Input 
        placeholder='Title' 
        onChangeText={title => setTitle(title)}
        value={title}/>  
      <Input placeholder='Credits' 
        keyboardType="numeric" 
        onChangeText={credit => setCredit(credit)}
        value={credit}/>      
      <Button
      onPress={saveItem} >
        SAVE
        <Icon name='save' color='white' style={{marginLeft:10}}/>
       </Button> 
    
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
          <ListItem.Swipeable bottomDivider
          rightContent={(action) => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
              }}
              type="clear"
              icon={{ name: 'delete-outline' }}
              onPress={()=> deleteItem(item.id)}
            />
          )}
          >
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.credits}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>} 
        data={courses} 
        
      />      
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  marginTop: 50,
  flex: 1,
  backgroundColor: '#fff',
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});
