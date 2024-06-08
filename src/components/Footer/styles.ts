import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Horizontal and vertical offset
    shadowOpacity: 0.2, // Opacity of the shadow
    shadowRadius: 4, // Blur radius of the shadow
    elevation: 2, // Android specific: shadow elevation
  },
});
