import { StyleSheet } from 'react-native';
import React, {useState} from "react"
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import Calculatorhome from './components/Calculatorhome';
import Calculatorhistory from './components/Calculatorhistory';

const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Calculator" component={Calculatorhome}/>
                <Stack.Screen name="History" component={Calculatorhistory}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });