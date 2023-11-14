import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

import { StyleSheet, View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';

const Leaderboard = ({ route, navigation }) => {
    const context = React.useContext(AppContext);

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [draws, setDraws] = useState(0);

    const tableHead = ['Outcome', 'Count'];
    const tableData = [['Wins ', wins], ['Losses ', losses], ['Draws ', draws]];

    useEffect(() => {
      loadRecords();
    }, []);

    useEffect(() => {
      saveRecords();
    }, [wins, losses, draws]);

    const loadRecords = async () => {
      try {
        const storedWins = await AsyncStorage.getItem('wins');
        const storedLosses = await AsyncStorage.getItem('losses');
        const storedDraws = await AsyncStorage.getItem('draws');
        
        if (storedWins) {
          setWins(Number(storedWins));
        } else {
          setWins(0);
        }

        if (storedLosses) {
          setLosses(Number(storedLosses));
        } else {
          setLosses(0);
        }

        if (storedDraws) {
          setDraws(Number(storedDraws));
        } else {
          setDraws(0);
        }

      } catch (error) {
        console.error('Failed to load stored values', error);
      }
    };

    const saveRecords = async () => {
      try {
        await AsyncStorage.setItem('wins', wins.toString());
        await AsyncStorage.setItem('losses', losses.toString());
        await AsyncStorage.setItem('draws', draws.toString());
      } catch (error) {
        console.error('Failed to load stored values', error);
      }
    };

    const handleWinPress = () => {
      setWins(wins + 1);
    };

    const handleLossPress = () => {
      setLosses(losses + 1);
    };

    const handleDrawPress = () => {
      setDraws(draws + 1);
    };

    const handleReverseWinPress = () => {
      setWins(wins - 1);
    };

    const handleReverseLossPress = () => {
      setLosses(losses - 1);
    };

    const handleReverseDrawPress = () => {
      setDraws(draws - 1);
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>LeaderBoard</Text>
            <Table borderStyle={{ borderWidth: 10, borderColor: 'blue' }}>
              <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={tableData} textStyle={styles.text} />
                <Text>___________________________</Text>
            </Table>
          <Text>Wins: {wins}</Text>
          <Text>Losses: {losses}</Text>
          <Text>Draws: {draws}</Text>
          <Button title="Win" onPress={handleWinPress} />
          <Button title="Lose" onPress={handleLossPress} />
          <Button title="Draw" onPress={handleDrawPress} />
          <Button title="Reverse Win" onPress={handleReverseWinPress} />
          <Button title="Reverse Lose" onPress={handleReverseLossPress} />
          <Button title="Reverse Draw" onPress={handleReverseDrawPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
    },
    head: {
        height: 44,
        backgroundColor: "f1f8ff",
    },
    headText: {
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
    text: {
      margin: 6,
      color: 'black',
      textAlign: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
    },
    tableContainer: {
      height: 200,
      marginTop: 10,
    },
  });

export default Leaderboard;