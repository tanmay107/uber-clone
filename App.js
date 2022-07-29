import { StatusBar } from 'expo-status-bar';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import EatsScreen from './screens/EatsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "android" ? "height" : "padding"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "android" ? 0 : -64}
        >
            <Stack.Navigator>
              <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EatsScreen"
                component={EatsScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}