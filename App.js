import React, {useEffect, useState} from 'react';
import {View, Dimensions,
  Text, 
  ActivityIndicator, FlatList,
  StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// "34,139,34" -> "#228b22"
const rgbDecimalStringToCSSHex = (str) => '#' + 
        str.split(',').map(x => parseInt(x).toString(16).padStart(2, '0')).join(''); 

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [trims, setTrims] = useState([]);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [orientation, setOrientation] = useState('portrait');

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
    const fetchMakes = async () => {
      if (makes.length > 0 || loading) {
        return;
      }
      setLoading(true);

      const response = await fetch(`https://carapi.app/api/makes?year=2020`);
      const data = await response.json();
      // setTimeout(function(){ 
        setMakes(data.data);

        setLoading(false);

        // setSelectedMake(JSON.stringify(data.data));
        setSelectedMake(null);
      // }, 3000);
  }
    fetchMakes().catch(error => {
      setError({message:`makes: ${error}`});
      setLoading(false);
    });
  },[]);

  useEffect(() => {
    const fetchModels = async () => {
      if (selectedMake === null || loading) {
        return;
      }

      setLoading(true);

      console.log(`selectedMake: ${selectedMake}`);
      const response = await fetch(`https://carapi.app/api/models?year=2020&verbose=yes&make_id=${selectedMake}`);
      const data = await response.json();
      //setTimeout(function(){
        setModels(data.data);

        setLoading(false);

        setSelectedModel(null);
//      }, 3000);
  }
  fetchModels().catch(error => {
      setError({message:`models: ${error}`});
      setLoading(false);
    });
},[selectedMake] );


useEffect(() => {
  const fetchTrims = async () => {
    if (selectedModel === null || loading) {
      return;
    }

    setLoading(true);

    console.log(`selectedModel: ${selectedModel}`);
    const response = await fetch(`https://carapi.app/api/trims?year=2020&make_model_id=${selectedModel}`);


    //const data = { data: [] };
    //const text = await response.text();
    //console.log(text);
    const data = await response.json();
    //setTimeout(function(){
      setTrims(data.data);

      setLoading(false);

      setSelectedTrim(null);
//      }, 3000);
}
fetchTrims().catch(error => {
    setError({message:`models: ${error}`});
    setLoading(false);
  });
},[selectedModel]);


  if (loading) {
    return (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    // Portrait - show Make, Model, Trim Levels dropdowns
    //Landscape - LEFT: show (FlatList) Dropdowns and Trim fields
    //            RIGHT: show Name, Description, Colors for selected Trim level
    <View style={styles.container}>
      {orientation === 'portrait' ? (
        <View style = {styles.container}>
          <Picker
              style={styles.picker}
              prompt="Choose Car Make"
              selectedValue={selectedMake}
              onValueChange={(itemValue, itemIndex) => {
                  setSelectedMake(itemValue);
                }}>
              {
                makes.length? makes.map(make => (
                  <Picker.Item key={make.id} label={make.name} value={make.id} />
                )) : <Picker.Item label="(Car Makes not loaded)" value={null} />
              }
            </Picker>
            <Picker
              style={styles.picker}
              prompt="Choose Model"
              selectedValue={selectedModel}
              onValueChange={(itemValue, itemIndex) => {
                  setSelectedModel(itemValue);
                }}>
              {
                (models && models.length)? models.map(model => (
                  <Picker.Item key={model.id} label={model.name} value={model.id} />
                )) : <Picker.Item label="(Car Models not loaded)" value={null} />
              }
            </Picker>
            <Picker
              style={styles.picker}
              prompt="Choose Trim"
              selectedValue={selectedTrim}
              onValueChange={(itemValue, itemIndex) => {
                  setSelectedTrim(itemValue);
                }}>
              {
                (trims && trims.length)? trims.map(trim => (
                  <Picker.Item key={trim.id} label={trim.name} value={trim.id} />
                )) : <Picker.Item label="(Car Trims not loaded)" value={null} />
              }
            </Picker>
            <Text style={styles.info}>Model: {selectedModel}</Text>
            <Text style={styles.info}>Trim: {selectedTrim}</Text>
        </View>
      ) : (
        <View style={styles.splitScreen}>
          <View style={{ flex: 1 }}>
            {/* Left Side */}
            <Picker
              style={styles.picker}
              prompt="Choose Car Make"
              selectedValue={selectedMake}
              onValueChange={(itemValue, itemIndex) => {
                  setSelectedMake(itemValue);
                }}>
              {
                makes.length? makes.map(make => (
                  <Picker.Item key={make.id} label={make.name} value={make.id} />
                )) : <Picker.Item label="(Car Makes not loaded)" value={null} />
              }
            </Picker>
            <Picker
              style={styles.picker}
              prompt="Choose Model"
              selectedValue={selectedModel}
              onValueChange={(itemValue, itemIndex) => {
                  setSelectedModel(itemValue);
                }}>
              {
                (models && models.length)? models.map(model => (
                  <Picker.Item key={model.id} label={model.name} value={model.id} />
                )) : <Picker.Item label="(Car Models not loaded)" value={null} />
              }
            </Picker>
            <Picker
              style={styles.picker}
              prompt="Choose Trim"
              selectedValue={selectedTrim}
              onValueChange={(itemValue, itemIndex) => {
                  setSelectedTrim(itemValue);
                }}>
              {
                (trims && trims.length)? trims.map(trim => (
                  <Picker.Item key={trim.id} label={trim.name} value={trim.id} />
                )) : <Picker.Item label="(Car Trims not loaded)" value={null} />
              }
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            {/* Right Side */}
            <FlatList
              data={trims}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.info}>{item.name}</Text>
                  {/* <Text style={[styles.info, { backgroundColor: rgbDecimalStringToCSSHex(item.color) }]}>{item.color}</Text> */}
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  error: {
    flex: 1,
    //justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 18,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
  },
  picker: {
    color: 'black',
  },
  info: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 18,
    color: 'black',
  },
  splitScreen: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
