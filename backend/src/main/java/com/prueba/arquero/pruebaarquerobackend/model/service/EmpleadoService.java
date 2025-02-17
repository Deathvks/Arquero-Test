package com.prueba.arquero.pruebaarquerobackend.model.service;

import com.prueba.arquero.pruebaarquerobackend.model.dao.IEmpleadoDao;
import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
