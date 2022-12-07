import React from 'react';
import {Text, View} from 'react-native';

const ListItem = ({item}) => {
  const valueObj = Object.values(item).flat();

  if (valueObj.length === 0) {
    return null;
  }

  return valueObj.map((val, indx) => {
    return (
      <View key={indx} style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>API: </Text>
          <Text>{val.API}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text>Category: </Text>
          <Text>{val.Category}</Text>
        </View>

        <View>
          <Text>Description: </Text>
          <Text>{val.Description}</Text>
        </View>
      </View>
    );
  });
};

export default ListItem;
