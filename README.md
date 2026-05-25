# Portafolio Juan

Portafolio personal construido con Node.js, Express.js, JavaScript vanilla y TailwindCSS instalado por npm.

## Ejecutar

```bash
npm install
npm start
```

Luego abre:

```text
http://localhost:3000
```

## Variables de entorno

Copia `.env.example` como `.env` y configura:

```text
MONGODB_URI=tu_uri_de_mongodb_atlas
MONGODB_DB=portafolio
ADMIN_PASSWORD=tu_contrasena_de_editor
PORT=3000
```

En el dominio/hosting agrega esas mismas variables en el panel de configuracion.

## Editar contenido

Usa el boton `Editar` en la parte superior. La contraseña es:

```text
La que pongas en ADMIN_PASSWORD
```

Los cambios se guardan en MongoDB Atlas y se cargan igual en computador y celular. El navegador mantiene una copia local solo como respaldo temporal.

## TailwindCSS

Entrada:

```text
public/input.css
```

Salida:

```text
public/output.css
```

Para volver a generar estilos:

```bash
npm run build:css
```
