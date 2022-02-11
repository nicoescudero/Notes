# Notes
Registro y Login de usuarios, CRUD de notas. Usando passport, manejando sesiones y jwt.

## Descargar el proyecto
Puedes descargar el proyecto en formato zip en el boton **Code** que aparece arriba del repositorio.

O puedes clonarlo copiando la url del repositorio, que aparece tambien en el boton de **Code**
y ejecutando en consola el comando 

>git clone urlRepositorio

## Instalar las dependencias
Para instalar las dependencias ubicate dentro la carpeta raiz del proyecto y abre una consola dentro de la carpeta, luego ejecuta el comando:
>npm install 

## Ejecutar el proyecto
Primero debes tener instalado mongodb y estar corriendo el servicio de mongo, dependiendo de cada sistema operativo.

Si tienes docker, tambien puedes instalar y correr el servicio de mongo ejecutando en consola el comando:

>docker run -d mongo

Tambien agrega un archivo *.env* en la carpeta raiz del proyecto con tus credenciales:

```
MDB_URI_PRODUCTION=mongodb://localhost/exampleProduction
MDB_URI_DEVELOPMENT=mongodb://localhost/exampleDevelopment
SECRET_KEY=mySecretKey
KEY_TOKEN=mySecretTokenKey
``` 

Para correr el proyecto, ejecuta en consola:
>npm start

Dentro de tu navegador accede a http://localhost:3000/ 

[![120.png](https://i.postimg.cc/W4D3Sn7D/120.png)](https://postimg.cc/67XtpCgw)

[![121.png](https://i.postimg.cc/W3b5QdhJ/121.png)](https://postimg.cc/5HT5zN5x)