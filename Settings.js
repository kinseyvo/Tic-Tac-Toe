import React, { useState } from 'react';
import AppContext from './AppContext';

import { StyleSheet, View, Button, Switch, Text, TouchableOpacity, TextInput } from 'react-native';

const Settings = ({navigation, route}) => {
    const context = React.useContext(AppContext);
    const { xColor, oColor } = route.params;

    const [soundEnabled, setSoundEnabled] = useState(true);
    const [newXColor, setNewXColor] = useState('');
    const [newOColor, setNewOColor] = useState('');
    const [timerEnabled, setTimerEnabled] = useState(true);

    const toggleSound = () => {
      setSoundEnabled(!soundEnabled);
    };

    const toggleTimer = () => {
      setTimerEnabled(!timerEnabled);
    }

    const applySettings = () => {
      context.setXColor(newXColor);
      context.setOColor(newOColor);
      navigation.navigate('Board', { xColor: newXColor, oColor: newOColor, soundEnabled: soundEnabled, timerEnabled: timerEnabled });
    };

    return (
      <View>
        <Text style={styles.title}>Settings Page</Text>
        <Text style={styles.header}>General</Text>
        <Text style={styles.header}>Colors</Text>
        <View>
          <Text style={styles.subHeader}>Enter X Color:</Text>
          <TextInput
            placeholder="X Color"
            onChangeText={setNewXColor}
            value={newXColor}
          />
          <Text style={styles.subHeader}>Enter Y Color:</Text>
          <TextInput
            placeholder="O Color"
            onChangeText={setNewOColor}
            value={newOColor}
          />
        </View>

        <Text style={styles.header}>Sound</Text>
        <Text>Sound {soundEnabled ? 'On' : 'Off'}</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
        <Text style={styles.header}>Timers</Text>
        <Text>Timer {timerEnabled ? 'On' : 'Off'}</Text>
        <Switch value={timerEnabled} onValueChange={toggleTimer} />
        <Text style={styles.header}>Privacy & Security</Text>
        <Text style={styles.subHeader}>A statement or a legal document that states how a company or website collects, handles and processes data of its customers and visitors.</Text>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Button title="Apply" onPress={applySettings} />
        </TouchableOpacity>
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
      fontSize: 12,
      color: 'black',
    },
    buttonWrapper: {
      marginVertical: 5,
    },
    copyrightText : {
      alignSelf: 'center',
      fontSize: 12,
      marginBottom: 10,
    }
  });

export default Settings;