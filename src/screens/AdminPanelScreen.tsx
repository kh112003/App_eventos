import React from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const logout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (err) {
      console.log('Logout error', err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 12 }}>
        Bienvenido a DPS Eventos
      </Text>
      <Button
        title='Ir a Panel Admin'
        onPress={() => navigation.navigate('AdminPanel')}
      />
      <View style={{ height: 8 }} />
      <Button
        title='Mis eventos'
        onPress={() => navigation.navigate('MyEvent')}
      />
      <View style={{ height: 8 }} />
      <Button title='Cerrar sesión' onPress={logout} />
    </View>
  );
}
