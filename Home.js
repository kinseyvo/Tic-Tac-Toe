import React, { useState } from 'react';
import AppContext from './AppContext';

import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//import {Picker} from '@react-native-picker/picker';

const Home = ({route, navigation}) => {
    const context = React.useContext(AppContext);

    const [openPlayer1, setOpenPlayer1] = useState(false);
    const [valuePlayer1, setValuePlayer1] = useState(null);
    const [openPlayer2, setOpenPlayer2] = useState(false);
    const [valuePlayer2, setValuePlayer2] = useState(null);

    const [items, setItems] = useState([
        {label: 'Player 1', value: 'Player 1'},
        {label: 'Player 2', value: 'Player 2'},
        {label: 'User 1', value: 'User 1'},
        {label: 'User 2', value: 'User 2'},
        {label: 'Batman', value: 'Batman'},
        {label: 'Joker', value: 'Joker'},
        {label: 'Prof', value: 'Prof'},
        {label: 'Student', value: 'Student'},
    ]);

    //const existingUsernames = ['Player 1', 'Player 2', 'User 1', 'User 2', 'Batman', 'Joker', 'Prof', 'Student'];

    const handleSettingsPress = () => {
        navigation.navigate('Settings');
    };
  
    const handleAboutPress = () => {
        navigation.navigate('About');
    };
  
    const handlePlayPress = () => {
        navigation.navigate('Board');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tic-Tac-Toe</Text>
            <Text style={styles.header}>The One That Decides It All...</Text>
            <View style={styles.inputContainer}>
                <View style={{ flex: 1 }}>
                    {/* Left Side */}
                    <Text style={styles.label}>Select or Enter Player 1's Name:</Text>
                    <DropDownPicker
                        open={openPlayer1}
                        value={valuePlayer1}
                        items={items}
                        setOpen={setOpenPlayer1}
                        setValue={(selectedValue) => {
                            setValuePlayer1(selectedValue);
                            context.setPlayer1Name(selectedValue);
                        }}
                        setItems={setItems}
                        placeholder='Select a name'
                    />
                    <TextInput
                        style={styles.textInput}
                        value={context.player1Name}
                        onChangeText={(text) => context.setPlayer1Name(text)}
                        placeholder="Player 1"
                    />
                </View>
                <View style={styles.verticalLine} />
                <View style={{ flex: 1 }}>
                    {/* Right Side */}
                    <Text style={styles.label}>Select or Enter Player 2's Name:</Text>
                    <DropDownPicker
                        open={openPlayer2}
                        value={valuePlayer2}
                        items={items}
                        setOpen={setOpenPlayer2}
                        setValue={(selectedValue) => {
                            setValuePlayer2(selectedValue);
                            context.setPlayer2Name(selectedValue);
                        }}
                        setItems={setItems}
                        placeholder='Select a name'
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Player 2"
                        value={context.player2Name}
                        onChangeText={(text) => context.setPlayer2Name(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Play" onPress={handlePlayPress}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Settings" onPress={handleSettingsPress}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="About" onPress={handleAboutPress}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 8,
      paddingVertical: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      color: '#3344FF',
    },
    header: {
      fontSize: 23,
      marginBottom: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    buttonContainer: {
      marginVertical: 10,
    },
    buttonWrapper: {
      marginVertical: 5,
    },
    touchableView: {
      width: 300,
      height: 300,
      backgroundColor: '#AEEEEE',
      marginBottom: 20,
    },
    sideBySide: {
        flex: 1,
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 16,
    },
    textInput: {
        fontSize: 16,
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: 'black',
    },
    textInputItem: {
        justifyContent: 'flex-start',
    },
    textInputDropDown: {
        backgroundColor: '#fafafa',
    },
  });

export default Home;