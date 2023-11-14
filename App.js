import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from './AppContext';
import Home from './Home';
import Board from './Board';
import Leaderboard from './Leaderboard';
import Settings from './Settings';
import About from './About';


const Stack = createNativeStackNavigator();

const App = () => {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [xColor, setXColor] = useState('red');
  const [oColor, setOColor] = useState('blue');

  const contextValue = {
    player1Name,
    player2Name,
    setPlayer1Name,
    setPlayer2Name,
    xColor,
    setXColor,
    oColor,
    setOColor,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} initialParams={{player1Name, player2Name}} />
          <Stack.Screen name="Board" component={Board} initialParams={{xColor, oColor}}/>
          <Stack.Screen name="Settings" component={Settings} initialParams={{xColor, oColor}}/>
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}


export default App;