import LinearGradientComponent from '../LinearGradientComponent';
import { StyleSheet, View } from 'react-native';
import EnvironmentIcon from '../../assets/icons/EnvironmentIcon';
import ForestIcon from '../../assets/icons/ForestIcon';
import SharedButton from '../SharedButton';
import GoalIcon from '../../assets/icons/GoalIcon';
import IconPlus from '../../assets/icons/IconPlus';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../../navigation/types';
import { ScreenNames } from '../../constants/screenNames';
import { getIconFillColor } from '../../utils/styleFunc';

const NavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const route = useRoute();

  const handlePress = (screenName: ScreenNames) => {
    if (route.name !== screenName) {
      navigation.navigate(screenName as any);
    }
  };

  return (
    <LinearGradientComponent
      colors={['#050505', '#0F0C0C', '#3A0001']}
      styles={styles.gradient}
      locations={[0, 0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      >
      <View style={styles.iconContainer}>
        <SharedButton
          onPress={() => handlePress(ScreenNames.MAIN_SCREEN)}
        >
          <EnvironmentIcon fill={getIconFillColor(route.name === ScreenNames.MAIN_SCREEN)} />
        </SharedButton>
        <SharedButton
          onPress={() => handlePress(ScreenNames.INFO_TREES_SCREEN)}
        >
          <ForestIcon fill={getIconFillColor(route.name === ScreenNames.INFO_TREES_SCREEN)} />
        </SharedButton>

        <SharedButton
          onPress={() => handlePress(ScreenNames.ADD_TREE_SCREEN)}
          styles={styles.btnPlus}
        >
          <IconPlus fill={'#FDF9F9'} isRedButton={true} />
        </SharedButton>

        <SharedButton
          onPress={() => handlePress(ScreenNames.GOALS_SCREEN)}
        >
          <GoalIcon fill={getIconFillColor(route.name === ScreenNames.GOALS_SCREEN)} />
        </SharedButton>
        <SharedButton
          onPress={() => handlePress(ScreenNames.SETTINGS_SCREEN)}
        >
          <SettingsIcon fill={getIconFillColor(route.name === ScreenNames.SETTINGS_SCREEN)} />
        </SharedButton>
      </View>
    </LinearGradientComponent>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    borderRadius: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-evenly',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C80D0D',
  },
  btnPlus: {
    backgroundColor: '#C80D0D',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavBar;
