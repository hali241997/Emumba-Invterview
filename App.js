import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {Button, FlatList, SafeAreaView, Text, View} from 'react-native';

/*

entries = [
  {}
]

*/

const App = () => {
  const [entries, setEntries] = useState({});
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  const fetchPublicApiEntries = async () => {
    try {
      const res = await axios.get('https://api.publicapis.org/entries');
      const entries = res.data.entries;

      let newEntries = {};

      entries.forEach(entry => {
        if (entry.Category) {
          const categoryKey = entry.Category.toLowerCase();
          if (newEntries[categoryKey]) {
            newEntries[categoryKey].push(entry);
          } else {
            newEntries[categoryKey] = [];
          }
        }
      });

      let newEntriesKeys = [];
      Object.keys(newEntries).forEach(entry => {
        newEntriesKeys.push({isSelected: false, key: entry});
      });

      setEntries(newEntries);
      setKeys(newEntriesKeys);
      setValues(
        Object.values(newEntries).length > 0
          ? Object.values(newEntries).flat()
          : [],
      );
    } catch (error) {
      console.log({error});
    }
  };

  const handlePress = item => {
    const _values = {...values};
    const anyAlreadySelected = _values.find(val => val.isSelected);
    if (anyAlreadySelected) {
      let newValues = entries[item];
      newValues.forEach(val => {
        _values.push(val);
      });

      setValues(_values);
    } else {
      setValues(entries[item]);
    }
  };

  useEffect(() => {
    fetchPublicApiEntries();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={keys}
        horizontal
        renderItem={({item}) => {
          return (
            <View
              style={{
                borderBottomWidth: item.isSelected ? 2 : 0,
                borderBottomColor: 'blue',
              }}>
              <Button title={item.key} onPress={() => handlePress(item)} />
            </View>
          );
        }}
      />

      <FlatList
        data={values}
        renderItem={({item}) => {
          return (
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text>API: </Text>
                <Text>{item.API}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text>Category: </Text>
                <Text>{item.Category}</Text>
              </View>

              <View>
                <Text>Description: </Text>
                <Text>{item.Description}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default App;
