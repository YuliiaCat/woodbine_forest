import React, { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IButton {
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const SharedButton: React.FC<IButton> = ({ styles, children, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles}
      disabled={disabled}
      >
      {children}
    </TouchableOpacity>
  );
};

export default SharedButton;
