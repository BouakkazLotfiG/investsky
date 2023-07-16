import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { SIZES, COLORS } from '../../constants/Theme';

interface AddButtonProps extends TouchableOpacityProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextButton: React.FC<AddButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.AddButtonContainer}>
      <Text style={styles.AddButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  AddButtonContainer: {
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.paddingVertical * 1.5,
    paddingHorizontal: SIZES.paddingHorizontal * 2,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  AddButtonText: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    alignSelf: 'center',
  },
});

export default TextButton;
