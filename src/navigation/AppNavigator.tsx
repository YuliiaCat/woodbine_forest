import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '../screens/LoadingScreen';
import OnBoardingScreen from '../screens/onBoardingScreen';
import MainScreen from '../screens/MainScreen';
import { RootStackNavigation } from './types';
import InfoTreesScreen from '../screens/InfoTreesScreen';
import TreeDetailsScreen from '../screens/TreeDetailsScreen';
import AddTreeScreen from '../screens/AddTreeScreen';
import NewTreeScreen from '../screens/NewTreeScreen';
import AddEventScreen from '../screens/AddEventScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GoalsScreen from '../screens/GoalsScreen';
import AddGoalScreen from '../screens/AddGoalScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import AddRequestScreen from '../screens/AddRequestScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createStackNavigator<RootStackNavigation>();

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="LOADING_SCREEN" component={LoadingScreen} />
        <Stack.Screen name="ON_BOARDING_SCREEN" component={OnBoardingScreen} />
        <Stack.Screen name="MAIN_SCREEN" component={MainScreen} />
        <Stack.Screen name="INFO_TREES_SCREEN" component={InfoTreesScreen} />
        <Stack.Screen name="TREE_DETAILS_SCREEN" component={TreeDetailsScreen} />
        <Stack.Screen name="ADD_TREE_SCREEN" component={AddTreeScreen} />
        <Stack.Screen name="NEW_TREE_SCREEN" component={NewTreeScreen} />
        <Stack.Screen name="ADD_EVENT_SCREEN" component={AddEventScreen} />
        <Stack.Screen name="SETTINGS_SCREEN" component={SettingsScreen} />
        <Stack.Screen name="GOALS_SCREEN" component={GoalsScreen} />
        <Stack.Screen name="ADD_GOAL_SCREEN" component={AddGoalScreen} />
        <Stack.Screen name="PRIVACY_POLICY_SCREEN" component={PrivacyPolicyScreen} />
        <Stack.Screen name="ADD_REQUEST_SCREEN" component={AddRequestScreen} />
        <Stack.Screen name="SUCCESS_SCREEN" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
