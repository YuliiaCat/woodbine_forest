import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ISettings from '../types/settings';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import React from 'react';
import LinearGradientComponent from './LinearGradientComponent';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';

interface ISettingsItem {
  item: ISettings;
}

const SettingsItem: React.FC<ISettingsItem> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const { title, icon, link } = item;

  const handlePress = () => {
    if (!link) {
      return;
    }

    navigation.navigate(link);
  };

  return (
    <LinearGradientComponent
        colors={['#050505', '#0F0C0C', '#3A0001']}
        styles={styles.gradient}
        locations={[0, 0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
      <TouchableOpacity style={styles.container} onPress={handlePress}>

        <Text style={styles.title}>{title}</Text>
        {icon && (() => {
          const IconComponent = icon;
          return <IconComponent />;
        })()}
    </TouchableOpacity>
  </LinearGradientComponent>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    borderRadius: 16,
    boxShadow: '4px 4px 4px 0px #EE131340',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C80D0D',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.DMSansRegular,
    fontSize: 20,
    lineHeight: 35,
  },
});

export default SettingsItem;
