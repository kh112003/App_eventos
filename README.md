# DPS Eventos (Expo - TypeScript)

Proyecto básico listo para Expo. Replacea **solo** el objeto `firebaseConfig` en `src/firebase.ts` con los valores de tu Firebase Console.

## Pasos para usar

1. Instalar dependencias:

```
npm install
npx expo install react-native-screens react-native-safe-area-context
```

2. Reemplaza `src/firebase.ts`:

- Ve a https://console.firebase.google.com/
- Crea un proyecto nuevo (ej: dps-eventos)
- En Configuración del proyecto -> Tus apps -> Añadir app Web (</>)
- Copia el objeto `firebaseConfig` y pégalo en `src/firebase.ts`

3. Ejecutar:

```
npx expo start
```

4. Escanea el QR con Expo Go o usa un emulador Android/iOS.

## Notas
- En desarrollo puedes poner reglas de Firestore abiertas, pero recuerda cerrarlas en producción.
- Este proyecto usa Firebase Web SDK (modular) y funciona con Expo Managed.