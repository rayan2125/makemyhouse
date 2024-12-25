import React from 'react';
import { View, Text } from 'react-native';

const ProgressBar = ({ totalAmount, progressAmount }) => {
  const progress = (progressAmount / totalAmount) * 100;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: '100%', height: 20, backgroundColor: '#eee', borderRadius:12 }}>
        <View style={{ width: `${progress}%`, height: 20, backgroundColor: '#002F5B', borderRadius:12 }} />
      </View>
      {/* <Text style={{ marginLeft: 10 }}>{progress}%</Text> */}
    </View>
  );
};

export default ProgressBar;