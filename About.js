import React, { useState } from 'react';
import AppContext from './AppContext';

import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const About = ({navigation}) => {
    const context = React.useContext(AppContext);
    
    return (
        <View>
            <Text style={styles.title}>About Page</Text>
            <Text style={styles.header}>Name: Kinsey Vo</Text>
            <Text style={styles.header}>Class: CPSC 411-01</Text>
            <Text style={styles.header}>Tic-Tac-Toe (2P)</Text>
            <Text style={styles.subHeader}>App detects winner and draw/cat's game.</Text>
            <Text style={styles.subHeader}>Users can change names, start new games, undo turns or admit loss and end game.</Text>
            <Text style={styles.subHeader}>View Leaderboard with W/L/Draw records.</Text>
            <Text style={styles.subHeader}>Sounds played on Wins and Draws!</Text>
            <Text style={styles.subHeader}>Settings Page to view and change configurations.</Text>
            <Text style={styles.subHeader}>Feature I added: Timer Feature.</Text>
            <Text style={styles.subHeader}>DESCRIPTION OF FEATURE: Players get 10 seconds to make a move or else their turn is skipped!</Text>
            <Text style={styles.copyrightText}>Copyright @ The Kinsey Company</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3375ff',
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeader: {
    fontSize: 13,
    marginBottom: 5,
    color: 'black',
  },
  copyrightText : {
    alignSelf: 'center',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default About;