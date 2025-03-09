import { FlatList, StyleSheet } from 'react-native';
import GoalLayout from '../components/SharedLayout/GoalLayout';
import { useRef } from 'react';
import settingsData from '../data/settingData';
import SettingsItem from '../components/SettingsItem';

const SettingsScreen = () => {
  const flatListRef = useRef<FlatList>(null);

  return (
    <GoalLayout
      title={'Settings'}
    >
      <FlatList
          ref={flatListRef}
          data={settingsData}
          scrollEnabled
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SettingsItem
              item={item}
             />
          )}
          contentContainerStyle={styles.list}
        />
    </GoalLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 16,
    marginTop: 16,
    zIndex: 10,
  },
});

export default SettingsScreen;
