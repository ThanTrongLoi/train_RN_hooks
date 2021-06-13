/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {NavigationContainer} from '@react-navigation/native'
import React from 'react';
import {
  Text, StatusBar,
} from 'react-native';
import { COLORS } from './src/constants';
import MainStackNavigator from './src/navigator/Navigator'
import { Provider } from 'react-redux';
import store from './src/redux/store'

const App = () => {

  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.background} />
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}; 


export default App;
