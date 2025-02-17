package com.prueba.arquero.pruebaarquerobackend.model.service;

import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;

import java.util.List;

public interface IEmpleadoService {

    public List<Empleado> getEmpleados();
    public Empleado getEmpleado(Long empleadoId);
    public void saveEmpleado(Empleado empleado);
    public void updateEmpleado(Empleado empleado);
    public void deleteEmpleado(Long empleadoId);

}
