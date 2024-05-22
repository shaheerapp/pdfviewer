import { NativeBaseProvider, StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import AppNavigations from './navigations/AppNavigations';
import { Provider } from 'react-redux';
import Store from './redux/store/Store';

// Define the colorModeManager,
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: any) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};
const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider colorModeManager={colorModeManager}>
        <AppNavigations />
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
