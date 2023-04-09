import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { Input, Button } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';


export default function App(){
 const [date, setDate] = useState(new Date());
 const [information, setInformation]=useState({
    date:'',
    place:'',
 });
 const [mode, setMode] = useState('date');
 const [show, setShow] = useState(false);
 const [list, setList] = useState([]);
    
const onChange = (e, selectedDate)=>{
    const currentDate = selectedDate
    setShow(false);
    setDate(currentDate)
    setInformation({...information, date: currentDate.toString()});
};

const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

const showDatepicker = () => {
    showMode('date');
  };

  const saveList =() =>{
    setList(information);
  }



    return(
        <View style={styles.container}>
            <View style={{flex:1, width:200, marginRight:20}}>
            <View style={{flexDirection:'row'}}>
            <Input
            label='Date'
            value={information.date}
            onChangeText={text => setInformation({...information, date:text})}        
            />
            <Button title='Datepicker' onPress={showDatepicker}/> 
            </View>
            <Input
            label='Place'
            value={information.place}
            onChangeText={text => setInformation({...information, place:text})}        
            />
            </View>
            <View style={{width:100, marginBottom:25}}>
                <Button title='SAVE' onPress={saveList}/>
            </View>
        <View style={{flex:2, width:200}}>
            <Text>{JSON.stringify(list)}</Text>
        </View>
        {show && (
        <DateTimePicker
             value={date}
             mode={mode}
             onChange={onChange}
        />
        )}
        </View>
    );
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