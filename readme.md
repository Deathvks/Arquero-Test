# Proyecto de Gestión de Empleados

## Descripción
Este proyecto es una aplicación web para la gestión de empleados, desarrollada con un backend en Java usando Spring Boot y un frontend en Angular. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre empleados.

## Tecnologías Utilizadas
- **Backend:** Java, Spring Boot, JPA, Hibernate, MySQL
- **Frontend:** Angular, TypeScript, HTML, CSS
- **Herramientas adicionales:** Node.js, npm, nvm

## Instalación y Configuración

### 1. Instalación de Node Version Manager (NVM)
Para evitar problemas de compatibilidad de versiones, se utilizó **nvm** y se estableció la versión 8 de Node.js.
```sh
nvm install 8
nvm use 8
```

### 2. Configuración del Backend
#### Archivos modificados:

**`EmpleadoService.java`**
```java
@Service
public class EmpleadoService implements IEmpleadoService{

    @Autowired
    private IEmpleadoDao empleadoDao;

    public List<Empleado> getEmpleados(){
        return (List<Empleado>) empleadoDao.findAll();
    }

    public Empleado getEmpleado(Long empleadoId){
        return empleadoDao.findById(empleadoId).orElse(null);
    }

    public void saveEmpleado(Empleado empleado){
        empleadoDao.save(empleado);
    }

    public void updateEmpleado(Empleado empleado){
        empleadoDao.save(empleado);
    }

    public void deleteEmpleado(Long id){
        empleadoDao.deleteById(id);
    }
}
```

**`EmpleadoController.java`**
```java
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
public class EmpleadoController {

    @Autowired
    private IEmpleadoService empleadoService;

    @GetMapping("/empleados")
    public List<Empleado> getEmpleados() {
        return empleadoService.getEmpleados();
    }

    @GetMapping("/empleados/{id}")
    public Empleado getEmpleado(@PathVariable Long id) {
        return empleadoService.getEmpleado(id);
    }

    @PostMapping("/empleados")
    @ResponseStatus(HttpStatus.CREATED)
    public Empleado saveEmpleado(@RequestBody Empleado empleado) {
        empleadoService.saveEmpleado(empleado);
        return empleado;
    }

    @PutMapping("/empleados/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Empleado updateEmpleado(@RequestBody Empleado empleado) {
        empleadoService.updateEmpleado(empleado);
        return empleado;
    }

    @DeleteMapping("/empleados/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmpleado(@PathVariable Long id) {
        empleadoService.deleteEmpleado(id);
    }
}
```

### 3. Configuración del Frontend

#### **`home.component.html`**
- Uso de la función "Editar empleado".
- Uso de manejo de errores.
- Uso validar DNI.

#### **`home.component.ts`**
Se han implementado las siguientes mejoras:
- Funcionalidad para editar empleados.
- Manejo de errores en el formulario
- Validación de DNI.
- Lógica para actualizar la tabla después de cambios.

#### **`home.component.css`**
- Se agregaron estilos generales.
- Se mejoró la responsividad de la aplicación hasta 360px.

## Ejecución del Proyecto
### 1. Iniciar el Backend
```sh
cd backend
mvn spring-boot:run
```

### 2. Iniciar el Frontend
```sh
cd frontend
npm install
ng serve --open
```

## Contribución
Si deseas contribuir a este proyecto:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-rama`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nuevos cambios'`).
4. Sube los cambios a tu fork (`git push origin <branch>`).
5. Crea un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT.

