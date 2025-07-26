# Eternium Idle
# FASE BETA NO ESTA TERMINADO
Eternium Idle es un juego incremental/idle RPG, ambientado en un mundo de fantasía medieval. El jugador comienza con la minería y desbloquea progresivamente nuevas actividades como combate, cocina y exploración. El progreso se guarda automáticamente en la nube.

## Tecnologías principales
- React + TypeScript
- CSS puro
- Firebase (autenticación y guardado)
- Internacionalización (Español e Inglés)

## Características principales
- Minería inicial, con desbloqueo progresivo de actividades.
- Combate automático con enemigos aleatorios y jefes.
- Guardado en la nube y autenticación por usuario/contraseña.
- Sprites provisionales (cuadrados de colores) fácilmente reemplazables.
- Inspiración visual en Cookie Clicker.
- Código bien documentado y estructurado para facilitar expansiones.

## Estructura del proyecto
- `/src` - Código fuente principal
- `/public` - Archivos estáticos y manifest
- `firebaseConfig.ts` - Configuración de Firebase
- `i18n.ts` - Configuración de internacionalización

## Scripts disponibles
- `npm start` - Ejecuta la app en modo desarrollo
- `npm run build` - Genera la build de producción
- `npm test` - Ejecuta los tests

## Cómo contribuir
1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3. Haz tus cambios y commitea: `git commit -m 'Agrega nueva funcionalidad'`
4. Haz push a tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## Licencia
MIT
