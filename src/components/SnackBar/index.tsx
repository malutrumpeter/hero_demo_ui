import React from 'react';
import {Card} from '../Card';
import {View, Text} from 'react-native';

interface Props {
  message: string;
}

export const SnackBar: React.FC<Props> = ({
  message,
}: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        left: 8,
        right: 8,
        height: 90,
        elevation: 10,
      }}>
      <Card color={'#323232'} borderColor={'white'}>
        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginVertical: 8,
          }}>
          <Text
            style={{color: '#4CAF50', alignSelf: 'center', fontSize: 16}}>
            {message}
          </Text>
        </View>
      </Card>
    </View>
  );
};
