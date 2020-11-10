# Volvo Cash Client

## Desarrollo

1. Instalar dependencias de JS: `yarn`
2. Instalar dependencias de iOS: `npx pod-install`
3. Levantar el servidor: `yarn start`
4. (Android) Para revisar si el celular esta conectado a la compu: `adb devices`
5. (Android) Para conectar el servidor al celular conectado: `adb -s IDDELCELULAR reverse tcp:8081 tcp:8081`
6. (Android) Instalar app: `npx react-native run-android`
7. (iOS) Para instalar en simulador: `npx react-native run-ios`
8. (iOS) Para instalar en device, abrir `ios/VolvoCashClient.xcworkspace` y clic en Play

## Despliegue

1. Actualizar version en `src/utils/constants.ts`
2. Levantar el servidor: `yarn start`
3. (iOS) Buildear: `yarn ios:build`
4. (iOS) abrir `ios/VolvoCashClient.xcworkspace`. Actualizar Version y Build del target principal
5. (iOS) Seleccionar "Build Any iOS device" y luego "Product > Archive"
6. (iOS) Cuando termine y abra el Organizer, seleccionar build y "Validate App"
7. (iOS) Si es valido y seleccionar build y "Distribute App"
8. (iOS) Ir al AppStoreConnect y subir compilación al grupo de pruebas correcto (o producción)
9. (Android) abrir Android Studio y esperar que todos los procesos terminen
10. (Android) "Build > Generate Signed APK/Bundle > Bundle/Release > Next > Release" y esperar que que todos los procesos terminen
11. (Android) Ir al Google Play Console y subir compilación al grupo de pruebas correcto (o producción)
