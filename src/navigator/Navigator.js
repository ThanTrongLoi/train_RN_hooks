import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Welcome, CreateAccount, SignIn, Onboarding, HomeScreen} from "../screens"

const Stack = createStackNavigator()

const MainStackNavigator = ({initialRoute = "OnboardingScreen"}) =>{
  return (
    <Stack.Navigator initialRouteName={initialRoute} headerMode="none">
      <Stack.Screen name="OnboardingScreen" component={Onboarding} />
      <Stack.Screen name="WelcomeScreen" component={Welcome}/>
      <Stack.Screen name="CreateAccountScreen" component={CreateAccount}/>
      <Stack.Screen name="SignInScreen" component={SignIn}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator