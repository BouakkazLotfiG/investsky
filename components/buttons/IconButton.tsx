import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SIZES, COLORS } from '../../constants/Theme';

interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon: IconProp;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      testID='icon-button'
    >
      <FontAwesomeIcon icon={icon} color='black' size={22} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius * 1.5,
    paddingVertical: SIZES.padding / 2,
    borderColor: COLORS.gray,
    borderWidth: 0.5,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
});

export default IconButton;
