import ISettings from '../types/settings';
import PrivacyIcon from '../assets/icons/PrivacyIcon';
import TermsIcon from '../assets/icons/TermsIcon';
import DeveloperIcon from '../assets/icons/DeveloperIcon';
import RequestIcon from '../assets/icons/RequestIcon';
import { ScreenNames } from '../constants/screenNames';

const settingsData: ISettings[] = [
  {
    id: 1,
    title: 'Privacy Policy',
    icon: PrivacyIcon,
    link: ScreenNames.PRIVACY_POLICY_SCREEN,
  },
  {
    id: 2,
    title: 'Terms of use',
    icon: TermsIcon,
  },
  {
    id: 3,
    title: 'Developer Website',
    icon: DeveloperIcon,
  },
  {
    id: 4,
    title: 'Request to add a new tree',
    icon: RequestIcon,
    link: ScreenNames.ADD_REQUEST_SCREEN,
  },
];

export default settingsData;
