
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


function timeoutPromise<T>(ms: number, promise: Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Tiempo de espera agotado después de ${ms} ms`));
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}


export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Ingresa email y contraseña');
    setLoading(true);
    console.log('[Registro] Iniciando registro para:', email);


    try {
      // Opcional: usar timeoutPromise para detectar si la petición queda colgada
      await timeoutPromise(15000, createUserWithEmailAndPassword(auth, email, password));
      console.log('[Registro] Registro exitoso para:', email);
      Alert.alert('Registro', 'Cuenta creada con éxito');
      navigation.replace('Home');
    } catch (err: any) {
      console.log('[Registro] Error:', err);
      // Muestra mensaje legible
      const message = err?.message || String(err);
      Alert.alert('Error al registrarse', message);
    } finally {
      setLoading(false);
      console.log('[Registro] Finalizado (loading=false)');
    }
  };


  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Ingresa email y contraseña');
    setLoading(true);
    console.log('[Login] Intentando login:', email);
    try {
      await timeoutPromise(15000, signInWithEmailAndPassword(auth, email, password));
      console.log('[Login] Login exitoso:', email);
      navigation.replace('Home');
    } catch (err: any) {
      console.log('[Login] Error:', err);
      const message = err?.message || String(err);
      Alert.alert('Error al iniciar sesión', message);
    } finally {
      setLoading(false);
      console.log('[Login] Finalizado (loading=false)');
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Iniciar sesión / Registrarse</Text>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Text>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 12, padding: 8 }} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Button title="Iniciar sesión" onPress={handleLogin} />
          <View style={{ height: 8 }} />
          <Button title="Crear cuenta" onPress={handleRegister} />
        </>
      )}
    </View>
  );
}
