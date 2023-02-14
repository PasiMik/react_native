
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import React, {useState} from "react"

export default function App() {
  const[todo, setTodo] = useState("");
  const[todos, setTodos] =useState([]);

  const addTodo = () => {
    setTodos([todo, ...todos]);
    setTodo("");
  }

  const listSeparator = () =>{
    return(
        <View style={{height:1, backgroundColor:"blue"}}/>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
      style={{width:200, borderColor: "gray", borderWidth:1}}
      value={todo}
      onChangeText={text => setTodo(text)}
      />
      <Button title="Add Todo" onPress={addTodo}/>
      <FlatList
      data ={todos}
      ItemSeparatorComponent={listSeparator}
      renderItem={({item}) => <Text style={{fontSize:18}}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});