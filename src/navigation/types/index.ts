import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import ITree from '../../types/tree';

export type RootStackNavigation={
  LOADING_SCREEN: undefined,
  ON_BOARDING_SCREEN: undefined,
  MAIN_SCREEN: undefined,
  INFO_TREES_SCREEN: undefined,
  TREE_DETAILS_SCREEN: {
    id: number;
    image: any;
    title: string;
    category?: string;
    description: string;
  },
  ADD_TREE_SCREEN: undefined,
  NEW_TREE_SCREEN: {
    item: ITree;
   },
  ADD_EVENT_SCREEN: { treeId: number },
  SETTINGS_SCREEN: undefined,
  GOALS_SCREEN: undefined,
  ADD_GOAL_SCREEN: undefined,
  PRIVACY_POLICY_SCREEN: undefined,
  ADD_REQUEST_SCREEN: undefined,
  SUCCESS_SCREEN: undefined,
}

export type TreeDetailsScreenNavigationProp = StackScreenProps<
  RootStackNavigation,
  'TREE_DETAILS_SCREEN'
>;

export type NavigationProps = StackNavigationProp<RootStackNavigation>;

export type NewTreeDetailsScreenNavigationProp = StackScreenProps<
  RootStackNavigation,
  'NEW_TREE_SCREEN'
>;

export type AddEventScreenNavigationProp = StackScreenProps<
  RootStackNavigation,
  'ADD_EVENT_SCREEN'
>;
