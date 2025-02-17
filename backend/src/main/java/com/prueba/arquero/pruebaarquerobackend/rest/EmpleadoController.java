package com.prueba.arquero.pruebaarquerobackend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;
import com.prueba.arquero.pruebaarquerobackend.model.service.IEmpleadoService;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
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
