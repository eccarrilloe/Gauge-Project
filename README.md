# Gauge Project

El proyecto gestiona la información relacionada con los Clientes, Los Sockets y los Medidores. Cuenta con un CRUD para cada componente. Además, cuenta con Login y gestión de tokens con JWT.


### Configuración del Entorno

Editor: Visual Studio Code
Sistema Operativo: Windows 10 (WSL - Ubuntu 20.04)
Librerías: Flask, Flask_Sqlalchemy, Flask_jwt_extended, flask_script, flask_migrate


### Esquema mental

Se comenzó estructurando el proyecto del API de Flask con los requerimientos necesarios. La gestión de la aplicación, la gestión de las migraciones de BD, los modelos, los controladores y las rutas.

Luego de ello, se comenzó a codificar cada una de las rutas y funcionalidades. Por último se conectaron las funcionalidades por medio del archivo de rutas `routes.py`