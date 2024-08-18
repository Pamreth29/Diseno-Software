# CASO #2
- Documentacion: https://developer.okta.com/docs/reference/rest/
- Tutorial sincronizacion OTKA - Postman: https://www.youtube.com/watch?v=u1Fqh4KneXI
## Pasos a seguir

### 1. Importar las colecciones de Groups, Users y Factors:
- https://developer.okta.com/docs/reference/postman-collections/

### 2. Crear los 3 grupos con la colección "Groups": (Marketing, Sales y C-Level)
- Crear grupo: Group Operations > Add Group

### 3. Crear 4 Usuarios con la colección "Users":
- Creamos el usuario perteneciente a un grupo: Create User > Create User in Group
- Le asignamos una contraseña a los usuarios: Credential Operations > Set Password
#### Usuarios: (nombre - contraseña)
- Yareth Morataya - minchurila2908
- Amy Morataya - lucas2908
- Patricia Sandoval - cuco2908
- Ricardo Morataya - minchu2908
#### Grupos y Usuarios:
- Marketing: Yareth Morataya
- Sales: Amy Morataya y Patricia Sandoval
- C-Level: Ricardo Morataya

### Habilitar MFA
- Documentación: https://developer.okta.com/docs/guides/mfa/ga/main/
- Se implementa el autenticador de Google
#### Para testear el MFA vamos a crear un usuario con "Create User without Credentials"
- Usuario: Lucas Duarte - ubersam28@gmail.com
- ID Usuario: 00uj2eog2iEGxU7Zx5d7
#### Ahora vamos a Enroll the factor con la sub-colección "Factor Lifecycle Operations" que se encuentra en la colección "Factors"
- Seleccionamos "Enroll Google Authenticator Factor" y en la URL reemplazamos {userId} por nuestro ID Usuario para testing
- ID Factor: uftj2ep1yqm0U6wel5d7
- Link proporcionado para obtener código QR: https://dev-62745605.okta.com/api/v1/users/00uj2eog2iEGxU7Zx5d7/factors/uftj2ep1yqm0U6wel5d7/qr/20111sHG3FkkTL1LIjf41utfVuqhNhn9OIkl-vHtUFu-LwL6DB60t5Y
#### Se realizan los pasos del apartado "Activate the factor":
- Se obtiene este ID: uftj2ep1yqm0U6wel5d7
