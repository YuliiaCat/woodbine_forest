import IonBoardingItem from '../types/onboarding';

const onBoardingData: IonBoardingItem[] = [
  {
    'id': 1,
    'image': require('../assets/img/onBoarding/on-boarding-1.png'),
    'title': 'Welcome to Woodbine Forest',
    'text': 'Create a greener world around you. Track your trees, care for them, and inspire others to join your journey.',
  },
  {
    'id': 2,
    'image': require('../assets/img/onBoarding/on-boarding-2.png'),
    'title': 'Manage Your Planted Trees',
    'text': 'Add trees with descriptions, map markers, and care logs. Everything you need for green care in one place.',
  },
  {
    'id': 3,
    'image': require('../assets/img/onBoarding/on-boarding-3.png'),
    'title': 'Share Your Green Impact',
    'text': 'Celebrate your achievements and inspire your community. Every tree you plant contributes to a brighter future.',
  },
];

export default onBoardingData;
