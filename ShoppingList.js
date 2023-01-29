import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import React, {useState} from "react"

export default function App() {
  const[shoppingListItem, setShoppingListItem] = useState("");
  const[shoppingList, setShoppingList] =useState([]);
  const[shoppedItems, setShoppedItems] = useState("")

  const addToShoppingList = () => {
    setShoppingList([shoppingListItem, ...shoppingList]);
    setShoppedItems("Shopping list")
    setShoppingListItem("");
  }

  const clearShoppingList =() =>{
    setShoppingList("");
    setShoppedItems("")
  }

  

  return (
    <View style={styles.container}>
      <TextInput
      style={{width:200, borderColor: "gray", borderWidth:1}}
      value={shoppingListItem}
      onChangeText={text => setShoppingListItem(text)}
      />
      <View style={{flexDirection: "row"}}>
      <Button title="Add" onPress={addToShoppingList}/>
      <View style={{marginHorizontal:5}}></View>
      <Button title="Clear" onPress={clearShoppingList}/>
      </View>
      <View>
        <Text style={{color: "blue", fontWeight:"bold"}}>{shoppedItems}</Text>
      <FlatList
      data ={shoppingList}      
      renderItem={({item}) => <Text>{item}</Text>}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});