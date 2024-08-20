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
- Yareth Morataya - minchurila2908 - 00uj2ee4n5KKQisu85d7
- Amy Morataya - lucas2908 - 00uj2eg86cu9Xwo3C5d7
- Patricia Sandoval - cuco2908 - 00uj2egy7sz91MhtX5d7
- Ricardo Morataya - minchu2908 - 00uj2ehbmwk44eqHY5d7
#### Grupos y Usuarios:
- Marketing (00gj2ed5ljBn3L7fJ5d7): Yareth Morataya
- Sales (00gj2eexhlHGQobyO5d7): Amy Morataya y Patricia Sandoval
- C-Level (00gj2ef7gdNLU1EWs5d7): Ricardo Morataya

### 4. Habilitar MFA
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

### 5. Asignación de permisos
- Vamos a crear una cuenta en: https://auth0.com
- Creamos una Authorization Store, en este caso "GummyBears"
- Nos dirigimos al FGA Dashboard y realizamos el Started Guide, diseñamos el modelo y creamos las reglas de tuplas

Modelo creado: 
#### Authorization Model (ID: 01J5REZSVGPA78EMSYW9MCV2MS)

```plaintext
model
  schema 1.1

type user
  relations
    define member_of: [Sales, Marketing, C-Level]

type Sales
  relations
    define members: [user]

type Marketing
  relations
    define members: [user]

type C-Level
  relations
    define members: [user]

type organization
  relations
    define can_access_CRM: [Sales#members, Marketing#members, C-Level#members]
    define can_access_Payment: [Sales#members]

type permission
  relations
    define can_display_card: [C-Level#members]
    define can_modify_info: [Marketing#members, C-Level#members]
    define can_see_columns: [user, C-Level#members]

type payment_method
  relations
    define creditDebit_Card_method: [user]
    define paypal_method: [user]
```
- Creación de Tuplas:

Relación Usuario-Grupo:
![RelacionUserGroup](./img/relacionUserGrupo.png)

!!ACTUALIZAR ESTO!
![pruebaRicardoMiembroCLevel](./img/pruebaRicardoMiembroCLevel.png)

Relación (Marketing, Sales, C-Level)-CRM y Sales-Payment:
![RelacionCRM_Payment](./img/crm_payment.png)

-----------------------------------------------
Permiso #1: A permission or permissions that determine which payment methods the user is entitled to use. The two Sales users should be configured with different payment methods.

![TuplaPermiso#1](./img/permiso1.png)
![Permiso#1: query1](./img/permiso1_Q1.png)
![Permiso#1: query2](./img/permiso1_Q2.png)

-----------------------------------------------
Permiso #2: Permission to determine whether the user can access and modify the contact info. A Sales user will not have this permission.
![TuplaPermiso#2](./img/permiso2.png)
![Permiso#2: query1](./img/permiso2_Q1.png)
![Permiso#2: query2](./img/permiso2_Q2.png)

-----------------------------------------------
Permiso #3: Permission to determine whether the user can see the two sales columns: Sales Goals and Sales Amount. Users in C-Level can see it, other groups cannot, but one specific Marketing user will have the right to see it. This permission is granted directly to the user, not to the group.

![TuplaPermiso#3](./img/permiso3.png)

-----------------------------------------------
Permiso #4: Permission to display the "Sales Target Progress" card. Only members of C-Level can see it.

![TuplaPermiso#4](./img/permiso4.png)

-----------------------------------------------
 **Pruebas:**
- Prueba #1: a group has a certain permission in a specific application
![prueba#1](./img/prueba1.png)
![prueba#11](./img/prueba11.png)

- Prueba #2: a user has access permission in a particular application
![prueba#2](./img/prueba2.png)
![prueba#22](./img/prueba22.png)
![prueba#222](./img/prueba222.png)

- Prueba #3: a user has a certain permission in an application inherited from belonging to a specific group
![prueba#3](./img/prueba3.png)
![prueba#33](./img/prueba33.png)
![prueba#4](./img/prueba4.png)
![prueba#44](./img/prueba44.png)