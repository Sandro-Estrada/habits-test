# Medicamentos

Esté proyecto fue creado para generar la parte **frontend** para la prueba de **Habits**.

## NOTA IMPORTANTE
Todos los endpoints están protegidos por JWT por lo que hay que crear un administrador desde la [API](https://documenter.getpostman.com/view/4955309/Tz5qaxaM).

```
POST - http://localhost:4010/v1/admin
BODY - {
    "user": "test",
    "password": "test"
}
```

## Prerequisitos

Para correr esté proyecto es necesario tener instalado:

- **NPM** en la versión **6.14.x**

## Instalación

Para tener el proyecto corriendo, es necesario seguir los siguientes pasos:

1. Clonar el repositorio: `git clone <REPOSITORIO>`
2. Ir a la carpeta frontend `cd frontend`
3. Instalar las dependencias: `npm install`
4. Iniciar el proyecto: `npm run start`
5. Visualizar el proyecto en el navegador <http://localhost:3000>

## Crear un static build

Para crear una instancia estatica del proyecto es necesario:

- `npm run build`

## Estructura de redux

Para manejar el flujo de trabajo con redux se manejaron los **reducers, types, actions y store** para mantener un control estandar.
[Redux](https://es.redux.js.org/docs/basico/acciones.html)

## Estructura del repositorio

```
/
├─ src/
│  ├─ assets/            # Assets
│  │  ├─ css/            # Estilos generales
│  │  ├─ fonts/          # Fuentes
│  ├─ components/        # Componentes
│  │  ├─ Login/          # Pantalla para iniciar sesión
│  │  ├─ Modal/          # Modal personalizable
│  │  ├─ Sidebar/        # Sidebar personalizable
│  │  ├─ Todos/          # Render de la lista de Medicamentos
│  │  ├─ CRUDModal       # Modal para visualizar, crear y editar un Medicamento
│  ├─ hooks/             # Hooks personalizables
│  │  ├─ useModal/       # Hook personalizado para el modal
│  │  ├─ useToken/       # Hook personalizado para obtener y settear el token
│  ├─ redux/             # Redux
│  │  ├─ actions/        # Funciones
│  │  ├─ reducers/       # Manejo de estado
│  │  ├─ types/          # Control de tipos
|  |  ├─ store           # Manejo de redux
|  ├─ styles/            # Estilos de componentes (SASS) 
|  |  ├─ base/           # Estilos base (generales)
|  |  ├─ components/     # Estilos por componente
|  |  ├─ styles          # Estilos generales
|  ├─ App                # Render principal
|  ├─ index.js           # Lanzador del render principal
├─ package.json          # Manifest del proyecto
└─ README.md             # README
```

## Componentes reusables

### Modal

Archivos:

- Modal.jsx
- Modal.css

Esté componente funciona como un modal flotante.

Esto gracias a que recibe propiedades (title, isOpen, closeModal, children) dinámicas.
[Props children](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)
También, dicho modal usa hooks personalizados.

```javascript
  const [isOpenModal, openModal, closeModal] = useModal(); 
```

## Accesos
Todos los endpoints están protegidos por JWT por lo que hay que crear un administrador desde la [API](https://documenter.getpostman.com/view/4955309/Tz5qaxaM).

```
POST - http://localhost:4010/v1/admin
BODY - {
    "user": "test",
    "password": "test"
}
```

Además, se cuenta con un login simple para proteger las rutas siguientes.

## Documentación
La documentación se encuentra en la carpeta raíz de este [proyecto](doc).

## Licencia

El proyecto usa una licencia de tipo [ISC](https://opensource.org/licenses/ISC)

## Autor

[Sandro Estrada](https://www.linkedin.com/in/sandro-estrada-elizondo-1b5411171/)
