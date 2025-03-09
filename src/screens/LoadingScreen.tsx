import { Animated, Image, StyleSheet, Text } from 'react-native';
import { fonts } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import { ScreenNames } from '../constants/screenNames';

const LoadingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const [fadeAnim] = useState(new Animated.Value(0.5));
  // const [showSecondLoader, setShowSecondLoader] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // setShowSecondLoader(true);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        });
          navigation.replace(ScreenNames.ON_BOARDING_SCREEN);
      });
    }, 1500);

    return () => {
      clearTimeout(firstTimeout);
    };
  }, [navigation, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../assets/img/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Forest</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    maxHeight: 181,
  },
  title: {
    fontFamily: fonts.JomhuriaRegular,
    color: '#ffffff',
    fontSize: 100,
    lineHeight: 100,
    textAlign: 'center',
  },
});

export default LoadingScreen;
