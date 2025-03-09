import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { AppRegistry, SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import LinearGradientComponent from './src/components/LinearGradientComponent';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persister } from './src/redux/store';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { name as appName } from './app.json';
import SplashScreen from 'react-native-splash-screen';

Geocoder.init(GOOGLE_MAPS_API_KEY, { language: 'en' });

function App (): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <LinearGradientComponent
          colors={['#050505', '#0F0C0C', '#3A0001']}
          locations={[0, 0.75, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          styles={styles.container}
          >
            <SafeAreaView style={styles.mainWrapper}>
              <AppNavigator />
            </SafeAreaView>
          </LinearGradientComponent>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
  },
});

export default App;
