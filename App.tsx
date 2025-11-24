import React, { useEffect, useState } from 'react';
    import { ActivityIndicator, View } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';

    import LoginScreen from './src/screens/LoginScreen';
    import HomeScreen from './src/screens/HomeScreen';
    import AdminPanelScreen from './src/screens/AdminPanelScreen';
    import MyEventScreen from './src/screens/MyEventScreen';

    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from './src/firebase';

    export type RootStackParamList = {
      Login: undefined;
      Home: undefined;
      AdminPanel: undefined;
      MyEvent: undefined;
    };

    const Stack = createNativeStackNavigator<RootStackParamList>();

    export default function App() {
      const [initializing, setInitializing] = useState(true);
      const [user, setUser] = useState<any>(null);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u);
          if (initializing) setInitializing(false);
        });
        return unsubscribe;
      }, []);

      if (initializing) {
        return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
            {!user ? (
              <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
                <Stack.Screen name="AdminPanel" component={AdminPanelScreen} options={{ title: 'Panel Admin' }} />
                <Stack.Screen name="MyEvent" component={MyEventScreen} options={{ title: 'Mis eventos' }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      );
    }