import { StyleProp, ViewStyle } from 'react-native';

interface IIcon {
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  isRedButton?: boolean;
}

export default IIcon;
