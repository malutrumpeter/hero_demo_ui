import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface Props {
  children: any;
  color: string;
  borderColor: string;
}

export const Card = ({
  children,
  color = '#FFFFFF',
  borderColor = '#FFFFFF',
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color, borderColor: borderColor, borderWidth: 0.5},
      ]}>
      {children}
    </View>
  );
};
