# Café Aroma — Tienda de café de especialidad

Web app + Android app (PWA + Capacitor) para una tienda en línea de café.

## Stack

- React 19 + Vite 8 + TailwindCSS v4
- React Router 7
- Framer Motion, Lucide React
- PWA (vite-plugin-pwa)
- Android (Capacitor 8) — envuelve la web compilada

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # build web -> dist/
npm run preview      # preview de producción
```

## Android (APK)

Requisitos locales: JDK 17 + Android Studio (SDK). En esta máquina no hay toolchain, por eso se incluye un workflow de GitHub Actions que compila el APK en la nube.

```bash
npm run build:android   # build web + cap sync android
npm run android:open    # abre en Android Studio
```

En Android Studio: Build → Build APK(s). El APK queda en `android/app/build/outputs/apk/`.

Sin Android Studio, el workflow `.github/workflows/build.yml` genera el APK como artifact.

## Despliegue en producción

### Web (Vercel)

```bash
npm i -g vercel
vercel --prod
```

O conecta el repo en Vercel/Netlify (usa `netlify.toml`). El comando de build es `npm run build` y el directorio de publicación `dist`. Se incluye rewrite SPA.

### Android (distribución)

- Obtén el APK del artifact de GitHub Actions o compílalo local.
- Firma con keystore propio para release (`./gradlew assembleRelease`).
- (Opcional) Publica en Google Play Console.

## PWA / Instalar como app

La web es una PWA instalable: en Chrome (Android) → menú → "Instalar aplicación". Funciona offline básico tras la primera carga.

## Estructura

```
src/
  components/   Navbar, ProductCard, CartDrawer, Footer
  context/      CartContext (localStorage)
  data/         products.js
  pages/        Home, Shop, Product, About
android/        Proyecto Capacitor (generado)
public/         iconos PWA
```

## Licencia

MIT.
