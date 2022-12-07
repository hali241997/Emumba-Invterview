import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ListHeader} from '../../components/ListHeader';
import {ListItem} from '../../components/ListItem';

const HomeScreen = () => {
  const [entries, setEntries] = useState([]);
  const [oldEntries, setOldEntries] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [keys, setKeys] = useState([]);

  const fetchPublicApiEntries = async () => {
    try {
      const res = await axios.get('https://api.publicapis.org/entries');
      const entries = res.data.entries;

      const newEntries = [];
      const newKeys = [];

      entries.forEach(entry => {
        if (entry.Category) {
          const categoryKey = entry.Category.toLowerCase();
          const index = newEntries.findIndex(
            item => Object.keys(item)[0] === categoryKey,
          );

          if (index > -1) {
            newEntries[index][categoryKey].push(entry);
          } else {
            newEntries.push({[categoryKey]: []});
          }
        }
      });

      newEntries.map(entry => {
        const key = Object.keys(entry)[0];
        newKeys.push({isSelected: false, key});
      });

      setEntries(newEntries);
      setOldEntries(newEntries);
      setKeys(newKeys);
    } catch (error) {
      console.log({error});
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
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <ListHeader
            item={item}
            oldEntries={oldEntries}
            setEntries={setEntries}
            keys={keys}
            setKeys={setKeys}
            showAll={showAll}
            setShowAll={setShowAll}
          />
        )}
      />

      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ListItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
