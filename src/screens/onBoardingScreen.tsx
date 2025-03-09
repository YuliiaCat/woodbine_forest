import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useRef, useState } from 'react';
import onBoardingData from '../data/onBoardingData';
import OnBoardingItem from '../components/OnBoardingItem/OnBoardingItem';
import Pagination from '../components/Pagination/Pagination';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../constants/screenNames';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import SharedButton from '../components/SharedButton';
import { fonts } from '../constants/fonts';

const OnBoardingScreen = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / event.nativeEvent.layoutMeasurement.width);
    setCurrentItem(newIndex);
  };

  const handleNext = () => {
    if (currentItem < onBoardingData.length - 1) {
      setCurrentItem((prevIndex) => {
        const nextIndex = prevIndex + 1;
        flatListRef.current?.scrollToOffset({ offset: nextIndex * width, animated: true });
        return nextIndex;
      });
    } else {
      navigation.navigate(ScreenNames.MAIN_SCREEN);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onBoardingData}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        initialNumToRender={1}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnBoardingItem
              image={item.image}
              title={item.title}
              text={item.text}
            />
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX} } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      />
      <View style={styles.funcWrapper}>
        <Pagination
          data={onBoardingData}
          currentIndex={currentItem}
        />
        <View style={styles.btnContainer}>
          <SharedButton
            onPress={handleNext}
            styles={styles.nextBtn}
          >
            <Text style={styles.btnText}>Next</Text>
          </SharedButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 86,
  },
  funcWrapper: {
    flexDirection: 'row',
    gap: 66,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  btnContainer: {
    width: 82,
    height: 82,
    backgroundColor: '#C80D0D33',
    borderRadius: 50,
    padding: 8,
  },
  nextBtn: {
    width: 67,
    height: 67,
    backgroundColor: '#C80D0D66',
    borderRadius: 50,
    padding: 8,
  },
  btnText: {
    fontFamily: fonts.DMSansRegular,
    width: 51,
    height: 51,
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#C80D0D99',
    borderRadius: 50,
  },
});

export default OnBoardingScreen;
