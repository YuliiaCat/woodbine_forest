import 'react-native-get-random-values';
import 'react-native-reanimated';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
