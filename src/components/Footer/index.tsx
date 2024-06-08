import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const Footer = ({children}: {children: any}) => {
  return <View style={styles.footer}>{children}</View>;
};
