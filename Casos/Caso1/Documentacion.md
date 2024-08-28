# CASO #1
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

## Modelo creado: 
#### Authorization Model (ID: 01J5TVSM01NS00PZD0FMSGYWEH)

```plaintext
model
  schema 1.1

type user

type group
  relations
    define member: [user]

type apps
  relations
    define can_access_CRM: [user, group#member]
    define can_access_Payment: [user, group#member]

type permission
  relations
    define can_display_card: [user, group#member]
    define can_modify_info: [user, group#member]
    define can_see_columns: [user, group#member]

type payment_method
  relations
    define creditDebit_Card_method: [user]
    define paypal_method: [user]
```
-----------------------------------------------
### Permiso #1: A permission or permissions that determine which payment methods the user is entitled to use. The two Sales users should be configured with different payment methods.

- Funciona: is user:Amy related to payment_method:Tarjeta as creditDebit_Card_method?
- No Funciona: is user:Amy related to payment_method:PayPal as paypal_method?
-----------------------------------------------
### Permiso #2: Permission to determine whether the user can access and modify the contact info. A Sales user will not have this permission.

- Funciona: is user:Yareth related to permission:AccessModifyInfo as can_modify_info?
- No Funciona: is user:Amy related to permission:AccessModifyInfo as can_modify_info?

-----------------------------------------------
### Permiso #3: Permission to determine whether the user can see the two sales columns: Sales Goals and Sales Amount. Users in C-Level can see it, other groups cannot, but one specific Marketing user will have the right to see it. This permission is granted directly to the user, not to the group.

- Funciona: is user:Ricardo related to permission:SeeColumns as can_see_columns?
- No Funciona: is user:Patricia related to permission:SeeColumns as can_see_columns?

-----------------------------------------------
### Permiso #4: Permission to display the "Sales Target Progress" card. Only members of C-Level can see it.

- Funciona: is group:C-Level#member related to permission:DisplayCard as can_display_card?
- No Funciona: is group:Sales#member related to permission:DisplayCard as can_display_card?

-----------------------------------------------
# **Pruebas:**
- OKTA FGA: https://dashboard.fga.dev/customers/01J5KFQPBYER6PZ6KCMPTRCDGW/stores/01J5KFQQ70BQFF3F0K6E2X3F5W/tuples
## Prueba #1: a group has a certain permission in a specific application

### Okta FGA
- Funciona: is group:Marketing#member related to apps:Acceso_CRM as can_access_CRM?
- No Funciona: is group:Marketing#member related to apps:Acceso_Payment as can_access_Payment?

### PostMan
- Funciona:
```
{
  "tuple_key": {
    "user": "group:Marketing#member",
    "relation": "can_access_CRM",
    "object": "apps:Acceso_CRM"
  }
}
```

- No Funciona:
```
{
  "tuple_key": {
    "user": "group:Marketing#member",
    "relation": "can_access_Payment",
    "object": "apps:Acceso_Payment"
  }
}
```

## Prueba #2: a user has access permission in a particular application

### Okta FGA
- Funciona: is user:Yareth related to apps:Acceso_CRM as can_access_CRM?
- No Funciona: is user:Yareth related to apps:Acceso_Payment as can_access_Payment?

### PostMan
- Funciona:
```
{
  "tuple_key": {
    "user": "user:Yareth",
    "relation": "can_access_CRM",
    "object": "apps:Acceso_CRM"
  }
}
```

- No Funciona:
```
{
  "tuple_key": {
    "user": "user:Yareth",
    "relation": "can_access_Payment",
    "object": "apps:Acceso_Payment"
  }
}
```

## Prueba #3: a user has a certain permission in an application inherited from belonging to a specific group

### Okta FGA
- Funciona: is user:Ricardo related to permission:SeeColumns as can_see_columns?
- No Funciona: is user:Yareth related to permission:DisplayCard as can_display_card?

### PostMan
- Funciona:
```
{
  "tuple_key": {
    "user": "user:Ricardo",
    "relation": "can_see_columns",
    "object": "permission:SeeColumns"
  }
}
```

- No Funciona:
```
{
  "tuple_key": {
    "user": "user:Yareth",
    "relation": "can_display_card",
    "object": "permission:DisplayCard"
  }
}
```

### Creación del Cliente
- Store ID: 01J5KFQQ70BQFF3F0K6E2X3F5W
- Model ID: 01J5TVSM01NS00PZD0FMSGYWEH
- Client Name: Pamela Morataya
- Client ID: 29JvIsSiBHmsJWYgJtO0CxWXllerXRqj
- Client Secret: 44f5Wp7PaYbSajo_u-cfR2KfeeGDH-wE8qzZp83xnEkmfcm0eGWq8Frqvsiynypj

- Access Token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlF0LVE0NVY1YXRYZkxGVzhfaW1fRSJ9.eyJpc3MiOiJodHRwczovL2Rldi0yb2prbnllcnFzbXM0cmZnLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiI0YlBaRk1HUVFDcW1TM3JIUzlVNTdLQ0lueERIWXY1QUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9taW5jaHVyaWxhLmNvbSIsImlhdCI6MTcyNDE4NTY4NiwiZXhwIjoxNzI0MjcyMDg2LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiI0YlBaRk1HUVFDcW1TM3JIUzlVNTdLQ0lueERIWXY1QSJ9.g2OGyal0Ol9oBpylOy1SoEyt3cO9CUg-MedSsKQmTuqWYR6Sw5JiEID6YUijt_9_lfObf8q90ywo03e8ytHeCvNJsp__OxUMXPJZHokOy95pHoKv9kvAKH4YdYI65y8925wHIbhIh0aZ_ufKZwtpew_MiyvmxQfysuuqSbo3FS70D4hdvM9GgNH7_RDQK_lzPqKCeBPsnGj9qLkaP4CskwTepWwfItPz5jZY0gy3ROojvVC9lIe6nnQG1PlQR5Ok9JVXvSgcCkiWH-mLG_sQqyl_WIPfntcgmiVNGJR5461kkF_btt1qWQZLIxUO8uR98SeUkAht0VLD980Bnn8aSw