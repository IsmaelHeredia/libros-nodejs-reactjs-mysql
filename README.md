# Gestor de libros

Este proyecto se encarga de organizar libros mediante tipo y género, se pueden editar y borrar los mismos, además también ofrece estadísticas con gráficos sobre cuanto libros tenemos por tipo y categoría. Usa NodeJS como Backend y ReactJS 18 como Frontend, como base de datos usa MySQL.

Unas imágenes : 

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh71ott1CYonr-fvst4eVfBxYydg6Ufeifb98FmA-qBQL1DGRBaQTyEgej4mjpmYv30163vdNIcosBG_sLpyErhg9MZBeaK5GGkrveadXACVjpYbgzwf0EygMjeLlzz26jYDsXr0feTAoC-HJSWtBcQuPNovpWzg33Z2hK87vjedjw8YhkdKrZBnrNPg-8/s1919/Screenshot_1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgmlYIh6mSijwZ8qMiwJEEgU9t5ZMVzvJB4mNkll5Tc6IhRphT5SY6kBti8ci-Q1X0KSB6M20D2zVCXzkZpIAbVVDhgkO5jsdGsUMc_nVSCRWJvPuUGP05elsBNdhhuBSkjSFD26fUke7fQRnqSyoH1dDbvDmKKclWEvhDKfs0kMlYu4JrNecsyrQfoaO8/s1919/Screenshot_2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQc2qQg-CxEnfYcx8AM-PykaR9B9SfSiYtaeZEmoAE7hbWV8LMyS8M6VtmCPC7czazxz_Y7GdMVs7q_MGqRrN4qOUIAAzIPZHP-baxm85KJgzyx7-fwQWgNR_f9knptsOpOInQ3XfQtus_s15SSxuc4BPXkFEzTz020df5xgLiaKvqBVW8fIsruB8DFxU/s1900/Screenshot_3.png)

Para instalar el sistema debe seguir los siguientes pasos :

Primero configuramos el archivo .env en el directorio Backend con los datos de configuración de nuestro servidor MySQL, una vez configurado el archivo .env y creada la base de datos deben ejecutar el script llamado bd_libros.sql, con eso instalamos las tablas y creamos un usuario por defecto que mas tarde pueden cambiar, el usuario y clave por defecto será "supervisor".

Para instalar el backend se debe ejecutar los siguientes comandos : 

```
npm install
node index.js
```
En la parte del Frontend se debe ejecutar lo siguiente : 

```
npm install
npm run dev
```
