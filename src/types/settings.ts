import { ComponentType } from 'react';
import { ScreenNames } from '../constants/screenNames';

interface ISettings {
  id: number;
  title: string;
  icon: ComponentType;
  link?: ScreenNames;
}

export default ISettings;
