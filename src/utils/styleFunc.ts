import { colors } from '../constants/colors';

export const getIconFillColor = (isActiveScreen: boolean): string => {
  return isActiveScreen ? colors.lightColor : '#ffffff80';
};
