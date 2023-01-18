import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import React, {useEffect, useState} from "react"


export default function NumberGuessing() {

const[inputNumber, setInputNumber] = useState("");    
const[randomNumber, setRandomNumber] = useState("");
const[guessedTimes, setGuessedTimes] = useState(1);
const[shownText, setShownText] = useState("")

useEffect(()=>
startGame(), 
[]);

const startGame = () =>{
    setRandomNumber(Math.floor(Math.random() * 100) + 1 )
    setShownText("Guess number between 1 - 100")
    }

const checkGuess= () => {
    if (inputNumber < randomNumber){
        setShownText("Your guess " + inputNumber + " is too low")
        setGuessedTimes(guessedTimes + 1)
        
    }
    else if(inputNumber > randomNumber){
        setShownText("Your guess " + inputNumber + " is too high")
        setGuessedTimes(guessedTimes + 1)
        
    }
    else{
        setShownText("You guessed the number in " + guessedTimes + " guesses")
        Alert.alert("You guessed the number in " + guessedTimes + " guesses")
    }
}

console.log(randomNumber)
console.log(inputNumber)
return(
    <View style={styles.container}>
        <Text>{shownText}</Text>
        <TextInput  style={{width: 200, borderColor:"gray", borderWidth: 1}}
            onChangeText ={text=> setInputNumber(text)}
            value={inputNumber}
            />
        <Button onPress={checkGuess} title="Make a guess"/>    
    </View>
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
  