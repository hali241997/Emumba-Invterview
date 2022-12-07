import React, {useCallback, useState} from 'react';
import {Button, View} from 'react-native';

const ListHeader = ({
  item,
  oldEntries,
  setEntries,
  keys,
  setKeys,
  showAll,
  setShowAll,
}) => {
  const handlePress = useCallback(
    title => {
      const _oldEntries = [...oldEntries];
      const _oldKeys = [...keys];

      const entry = _oldEntries.find(val => Object.keys(val)[0] === title);
      if (entry) {
        if (!showAll) {
          console.log(entry);
          setEntries(prevState => {
            return [...prevState, entry];
          });
        } else {
          setEntries([entry]);
          setShowAll(false);
        }
      }

      const keyIndex = _oldKeys.findIndex(val => val.key === title);
      if (keyIndex > -1) {
        _oldKeys[keyIndex].isSelected = true;
        setKeys(_oldKeys);
      }
    },
    [keys, oldEntries, setEntries, setKeys, setShowAll, showAll],
  );

  return (
    <View
      style={{
        borderBottomColor: 'blue',
        borderBottomWidth: item.isSelected ? 2 : 0,
      }}>
      <Button title={item.key} onPress={() => handlePress(item.key)} />
    </View>
  );
};

export default ListHeader;
