import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text } from 'react-native';

function App() {
  const [orientation, setOrientation] = useState('portrait');
  const [showLandscapeText, setShowLandscapeText] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };
    
    Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (orientation === 'landscape') {
      // Enable text in Landscape mode
      setShowLandscapeText(true);
    } else {
      // Disable text in Portrait mode
      setShowLandscapeText(false);
    }
  }, [orientation]);

  return (
    <View>
      {orientation === 'portrait' ? (
        <Text>You're in Portrait mode!</Text>
      ) : (
        <Text>You're in Landscape mode!</Text>
      )}
      {showLandscapeText && (
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      )}
    </View>
  );
}

export default App;
