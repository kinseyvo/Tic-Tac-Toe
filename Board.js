import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput } from 'react-native';
import Sound from 'react-native-sound';

import AppContext from './AppContext';

Sound.setCategory('Playback');

const victoryAudio = require('./assets/audio/victory.wav');
const gameOverAudio = require('./assets/audio/gameover.wav');


const Board = ( {route, navigation} ) => {
  const context = React.useContext(AppContext);
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [lastMove, setLastMove] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const TIMER_DURATION = 10;

  const { xColor, oColor, soundEnabled, timerEnabled, setWins, setLosses, setDraws, wins, losses, draws } = route.params;

  const sound1 = new Sound(victoryAudio, error => {
    if (error) {
      console.log('failed to load the victory sound', error);
      return;
    }
  });
  // loaded successfully
  if (sound1) {
    console.log(
      'sound1 duration in seconds: ' +
        sound1.getDuration() +
        ' number of channels: ' +
        sound1.getNumberOfChannels(),
    );
  } else {
    console.log('victory sound is null');
  }
  const sound2 = new Sound(gameOverAudio);


  const checkForWinner = () => {
    // Check rows
    for (i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return true;
      }
    }

    // Check columns
    for (j = 0; j < 3; j++) {
      if (board[0][j] && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
        return true;
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return true;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return true;
    }

    // If no winner, return false
    return false;
  };

  const checkForDraw = () => {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          // Check if any cells are empty
          return false;
        }
      }
    }

    if (soundEnabled) {
      console.log('soundEnabled:', soundEnabled);
      console.log('playing draw sound');
      sound2.play();
    }
    console.log('soundEnabled:', soundEnabled);

    setGameOver(true);

    // All cells are filled and there's no winner
    return !checkForWinner();
  };

  const handleUndo = () => {
    if (gameOver) {
      return;
    }

    if (lastMove) {
      const { row, col } = lastMove;
      const newBoard = [...board];
      newBoard[row][col] = null;
      setBoard(newBoard);

      setLastMove(null);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
    return;
  };

  const handleResign = () => {
    if (!gameOver) {
      // The winner is the one that didn't resign
      const winner = currentPlayer === 'X' ? context.player2Name : context.player1Name;

      setWinner(winner);
      setGameOver(true);
      setIsDraw(false);
    }
  };

  const handlePlayAgain = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)))
    setGameOver(false);
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  const handleSeeLeaderboard = () => {
    navigation.navigate('Leaderboard')
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  const handleCellPress = (row, col) => {
    // If game is over or the cell is already filled, return
    if (gameOver || board[row][col] !== null) {
      return;
    }

    // Check if cell is already filled
    if (board[row][col] === null) {
      console.log("X color: ", xColor);
      console.log("Y color: ", oColor);

      // Update the board with the player's move
      const newBoard = [...board];

      // Update the cell with the current player's symbol
      newBoard[row][col] = currentPlayer;

      // Update the board state
      setBoard(newBoard);
      setLastMove({row, col});

      if (timerEnabled) {
        setIsTimerRunning(true);
        setTimer(TIMER_DURATION);
      }

      // Check for winner
      const winner = checkForWinner();
      if (winner) {
        // Setting name of winner
        const winningPlayer = currentPlayer === 'X' ? context.player1Name : context.player2Name;
        setWinner(winningPlayer);
        setGameOver(true);

        if (soundEnabled) {
          console.log('soundEnabled:', soundEnabled);
          console.log('playing victory sound');
          sound1.play();
        }
        console.log('soundEnabled:', soundEnabled);
      }

      if (!winner && checkForDraw()) {
        setIsDraw(true);
      }

      else {
        // Switch symbol for next player's turn aka handling player turns
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            // Switch to next player's turn if timer is up
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            setIsTimerRunning(false);
            return 10;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval)
    };
  }, [isTimerRunning, currentPlayer, gameOver]);


  return (
    <View style={styles.container}>
        <Text style={styles.header}>{context.player1Name || "Player 1"} vs {context.player2Name || "Player 2"}</Text>
        {timerEnabled && timer !== null && <Text>Timer: {timer} seconds</Text>}

        <View key={JSON.stringify(board)}style={styles.board}>
            {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cell, colIndex) => (
                        <TouchableOpacity
                            key={colIndex}
                            style={[styles.cell,
                              { color: currentPlayer === 'X' ? xColor : oColor }
                            ]}
                            onPress={() => handleCellPress(rowIndex, colIndex)}
                        >
                        <Text style={styles.cellText}>{cell}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
      </View>

      {winner && (
        <Text style={styles.winnerMessage}>{winner} wins!</Text>
      )}

      {isDraw && <Text style={styles.drawMessage}>Draw!</Text>}

      <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
                <Button title="Undo" onPress={handleUndo}/>
            </View>
            <View style={styles.buttonWrapper}>
                <Button title="Resign (Admit Loss and Take L)" onPress={handleResign}/>
            </View>
            <View style={styles.buttonWrapper}>                
                <Button title="Play Again/New Game" onPress={handlePlayAgain}/>
            </View>
            <View style={styles.buttonWrapper}>
                <Button title="See Leaderboard" onPress={handleSeeLeaderboard}/>
            </View>
            <View style={styles.buttonWrapper}>
                <Button title="Settings" onPress={handleSettingsPress}/>
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="About" onPress={handleAboutPress}/>
            </View>
        </View>

    </View>
  );
}

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
    marginBottom: 9,
    color: '#FF5733',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 10,
  },
  cellText: {
    fontSize: 36,
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
  winnerMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 20,
  },
  drawMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
  },
});

export default Board;