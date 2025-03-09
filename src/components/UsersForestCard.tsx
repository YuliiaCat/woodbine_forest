import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TreeImage from './TreeImage/TreeImage';
import ITree from '../types/tree';
import { fonts } from '../constants/fonts';
import LocationIcon from '../assets/icons/LocationIcon';
import ArrowIconRight from '../assets/icons/ArrowIconRight';

interface IUsersForestCard {
  item: ITree;
  onPress: () => void;
}

const UsersForestCard: React.FC<IUsersForestCard> = ({ item, onPress }) => {
  const { image, title, locationName, date } = item;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TreeImage
        source={image ? { uri: image } : require('../assets/img/main/tree.webp')}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationContainer}>
          <View style={styles.locBox}>
            <LocationIcon fill={'#C80D0D'} />
            <Text style={styles.text}>{locationName ?? 'Location'}</Text>
          </View>
          <ArrowIconRight fill={'#FDF9F9'} />
        </View>
        <Text style={styles.text}>{date?.toString().slice(0, 10).replaceAll('-', '.')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 13,
    backgroundColor: '#101010',
    borderRadius: 15,
  },
  image: {
    width: 310,
    height: 310,
    borderRadius: '50%',
  },
  title: {
    color: '#FDF9F9',
    fontFamily: fonts.DMSansSemiBold,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locBox: {
    flexDirection: 'row',
    gap: 3.5,
    alignItems: 'center',
  },
  text: {
    color: '#FDF9F9',
    opacity: 0.5,
  },
});

export default UsersForestCard;
